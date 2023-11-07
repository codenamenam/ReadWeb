import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient(
    "https://ebneycbqwtuhyxggghia.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibmV5Y2Jxd3R1aHl4Z2dnaGlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTE0MDY2OCwiZXhwIjoyMDA0NzE2NjY4fQ.s6hubrc6xEmKnz2Z7f-QxgOq9sJNN19d8fqtosCoPDs"
  );

  try {
    if (req.method == "POST") {
      const { data, error } = await supabase.functions.invoke(
        "post-functions",
        {
          headers: {
            "Function-Name": "jmt-submit-summary-web",
          },
          body: req.body,
        }
      );

      if (data["message"]) {
        res.status(200).json(200);
      } else if (data["error"]["code"] === 400) {
        res.status(200).json(400);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert data" });
  }
}
