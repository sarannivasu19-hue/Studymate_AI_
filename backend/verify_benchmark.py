import urllib.request
import json
import time

cases = [
    "What is Python?",
    "Explain Python step by step.",
    "Write a Python program to check if a number is prime and explain how it works."
]

url = "http://127.0.0.1:8000/api/ai/chat/stream"
results = []

for q in cases:
    print(f"\n==================================================")
    print(f"TESTING QUERY: {q}")
    print(f"==================================================")
    
    payload = json.dumps({"message": q}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    
    t0 = time.time()
    first_token_time = None
    chunks_count = 0
    full_text = ""
    
    with urllib.request.urlopen(req) as resp:
        for raw_line in resp:
            line = raw_line.decode("utf-8").strip()
            if not line.startswith("data:"):
                continue
            payload_str = line[5:].strip()
            if payload_str == "[DONE]":
                break
            try:
                data = json.loads(payload_str)
                if "text" in data:
                    if first_token_time is None:
                        first_token_time = time.time()
                    chunks_count += 1
                    full_text += data["text"]
            except Exception:
                pass
                
    total_time = time.time() - t0
    ttft = (first_token_time - t0) if first_token_time else 0.0
    
    has_definition = "**Definition**" in full_text
    has_key_points = "**Key Points**" in full_text
    has_numbered_steps = any(f"{i}." in full_text for i in range(1, 5))
    has_code_block = "```" in full_text
    has_summary = "**Summary**" in full_text
    has_bullet_points = ("* " in full_text) or ("- " in full_text)
    
    print(f"Time to First Token: {ttft:.2f}s")
    print(f"Total Response Time: {total_time:.2f}s")
    print(f"Total Streamed Chunks: {chunks_count}")
    print(f"Characters Received: {len(full_text)}")
    print("Formatting Checks:")
    print(f"  - Definition: {'PASS' if has_definition else 'N/A'}")
    print(f"  - Key Points: {'PASS' if has_key_points else 'N/A'}")
    print(f"  - Bullet points: {'PASS' if has_bullet_points else 'FAIL'}")
    print(f"  - Numbered steps: {'PASS' if has_numbered_steps else 'N/A'}")
    print(f"  - Code block (```): {'PASS' if has_code_block else 'N/A'}")
    print(f"  - Summary: {'PASS' if has_summary else 'N/A'}")
    
    print("\n--- SAMPLE PREVIEW ---")
    print(full_text[:400].strip())
    print("\n...\n")
    
    results.append({
        "query": q,
        "ttft": ttft,
        "total_time": total_time,
        "chunks": chunks_count,
        "length": len(full_text)
    })

print("\n" + "="*60)
print("FINAL BENCHMARK REPORT")
print("="*60)
for r in results:
    print(f"Query: \"{r['query']}\"")
    print(f"  -> Time to First Token: {r['ttft']:.2f}s")
    print(f"  -> Total Streaming Time: {r['total_time']:.2f}s")
    print(f"  -> Total SSE Chunks: {r['chunks']}")
    print(f"  -> Output Length: {r['length']} chars")
    print("-" * 40)
