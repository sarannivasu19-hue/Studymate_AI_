import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.services.gemini_service import generate_response, stream_response

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    reply = generate_response(request.message)
    return ChatResponse(response=reply)


@router.post("/chat/stream")
def chat_stream(request: ChatRequest):
    def event_stream():
        try:
            for chunk in stream_response(request.message):
                # Send Server-Sent Events with JSON payload
                yield f"data: {json.dumps({'text': chunk})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )