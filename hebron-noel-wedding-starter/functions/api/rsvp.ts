interface Env {
  DB: D1Database;
}

interface RsvpBody {
  fullName?: string;
  email?: string;
  attendance?: "yes" | "no";
  guestCount?: number;
  dietaryNotes?: string;
  message?: string;
  website?: string; // Honeypot field for basic bot filtering
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: RsvpBody;

  try {
    body = await request.json<RsvpBody>();
  } catch {
    return json({ error: "Please submit a valid response." }, 400);
  }

  // Silently accept bot honeypot submissions without saving them.
  if (body.website) return json({ ok: true });

  const fullName = String(body.fullName ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 254);
  const attendance = body.attendance;
  const guestCount = Number(body.guestCount ?? 1);
  const dietaryNotes = String(body.dietaryNotes ?? "").trim().slice(0, 500);
  const message = String(body.message ?? "").trim().slice(0, 1000);

  if (fullName.length < 2) return json({ error: "Please enter your full name." }, 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  if (attendance !== "yes" && attendance !== "no") {
    return json({ error: "Please select whether you can attend." }, 400);
  }
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
    return json({ error: "Guest count must be between 1 and 10." }, 400);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO rsvps (full_name, email, attendance, guest_count, dietary_notes, message)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(fullName, email || null, attendance, guestCount, dietaryNotes || null, message || null).run();

    return json({ ok: true });
  } catch {
    return json({ error: "We couldn't save your response right now. Please try again later." }, 500);
  }
};