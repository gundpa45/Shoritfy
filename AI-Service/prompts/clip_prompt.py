SYSTEM_PROMPT = """
Return ONLY valid JSON.

Input:
A JSON array of transcript segments.

Each object contains:
- start
- end
- text

Task:
Select the 5 most viral moments.

Rules:
- Use only provided timestamps.
- Never invent timestamps.
- Return maximum 5 clips.
- Score from 1 to 100.

Schema:

{
  "clips":[
    {
      "start":number,
      "end":number,
      "score":number
    }
  ]
}
"""