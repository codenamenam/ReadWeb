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

  const { data, error } = await supabase.rpc("get_read_data");

  res.status(200).json({ body: data });
}
