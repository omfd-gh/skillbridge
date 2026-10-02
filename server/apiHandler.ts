import type { IncomingMessage, ServerResponse } from 'node:http';
import { aiService, type ChatRequestPayload } from './aiService.ts';

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = req.url || '';
  const method = req.method || 'GET';

  // Enable JSON response headers
  res.setHeader('Content-Type', 'application/json');

  // Route: GET /api/ai/status
  if (method === 'GET' && (url === '/api/ai/status' || url.startsWith('/api/ai/status?'))) {
    const status = aiService.getStatus();
    res.statusCode = 200;
    res.end(JSON.stringify(status));
    return true;
  }

  // Route: POST /api/ai/chat
  if (method === 'POST' && url === '/api/ai/chat') {
    try {
      const body = await parseJsonBody<ChatRequestPayload>(req);

      if (!body.message || typeof body.message !== 'string') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Field "message" is required and must be a string.' }));
        return true;
      }

      // Call AI Service
      const aiResponse = await aiService.generateResponse(body);
      res.statusCode = 200;
      res.end(JSON.stringify(aiResponse));
      return true;
    } catch (err: any) {
      const statusCode = err.statusCode || 500;
      const errorMessage = err.message || "SkillBridge AI couldn't respond right now. Please try again.";

      res.statusCode = statusCode;
      res.end(
        JSON.stringify({
          error: errorMessage,
        })
      );
      return true;
    }
  }

  return false;
}

function parseJsonBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      // Protect against oversized payloads (>1MB)
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });

    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed as T);
      } catch {
        reject(new Error('Invalid JSON payload in request body.'));
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}
