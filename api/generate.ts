import { VercelRequest, VercelResponse } from '@vercel/node';
import Replicate from 'replicate';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 获取 Authorization 头 (用户的 API Key)
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({
        error: 'Missing or invalid API Key'
      });
    }
    const apiToken = authHeader.split(' ')[1];

    // 初始化 Replicate (使用用户的 Key)
    const replicate = new Replicate({
      auth: apiToken,
    });

    // 处理图片数据
    const { imageData, mimeType } = request.body;
    
    if (!imageData) {
      return response.status(400).json({ error: 'No image provided' });
    }

    const imageUri = `data:${mimeType};base64,${imageData}`;

    // 定义我们精心设计的 Prompt (手机直出风 + 漫画手绘)
    const SYSTEM_PROMPT = `
      Hyperrealistic Amateur photography, Captured on an android phone, Boring reality, Candid, 23mm focal length, detailed, Realism, Washed out, casual photography, natural lighting, disposable camera vibe, background also in focus, add tiny imperfections, imperfect, everyday aesthetic, 2020 vibe, amateur photo, slight JPEG artifacts, shot on mobile phone, Grain in dark areas, Overexposed, tiny imperfections, unpolished look, unedited snapshot,
      (POV shot:1.4), (a hand holding an open spiral sketchbook against a plain white wall:1.5), (hard sunlight casting shadows of the spiral binding on the paper:1.3),
      [Drawing Content on Paper]: (marker sketch based on the input image, nanao-banana art style, visible ink bleeding, paper texture, vibrant marker strokes), 
      (texture details: off-white paper, slight paper buckling from wet ink, realistic skin texture on hand).
    `;

    const NEGATIVE_PROMPT = `
      No date and time on photo, No intense colors, No intense filters, No Cinematic vibe, No vignette, No Background Blur, No perfect composition, centered subject, less symmetry, No low resolution, No grain, floating sparkles, magic particles, digital art overlay, vector graphic, flat color background, studio lighting, 3d render, cgi, cartoon hand, perfect manicure, bad hands, missing fingers.
    `;

    // 调用 Replicate (使用 SDXL 模型)
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: imageUri,
          prompt: SYSTEM_PROMPT,
          negative_prompt: NEGATIVE_PROMPT,
          prompt_strength: 0.55,
          num_inference_steps: 30,
          guidance_scale: 6.0,
        }
      }
    );

    return response.json({ result: output });

  } catch (error: any) {
    console.error("API Error:", error);
    return response.status(500).json({
      error: error.message || 'Something went wrong with Replicate'
    });
  }
}
