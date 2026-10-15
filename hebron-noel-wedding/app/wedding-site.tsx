"use client";

import { FormEvent, useState } from "react";

const faqs = [
  { q: "What should I wear?", a: "Dress code details are coming soon. We’ll update this answer once the dress code has been confirmed." },
  { q: "Can I bring a plus-one?", a: "Please RSVP only for the guests named on your invitation. If you have a question about your invitation, reach out to us directly." },
  { q: "Are children invited?", a: "We’ll share our plans for children and family seating here soon." },
  { q: "When should I arrive?", a: "Please arrive 30 minutes before the ceremony so everyone can be seated before we begin. The exact ceremony time will be added soon." },
  { q: "Where should I stay?", a: "Our travel guide will be updated with recommended hotels and transport options as details are confirmed." },
  { q: "Can I take photos?", a: "We love that you’ll want to remember the day. Ceremony photography guidance will be shared closer to the wedding." }
];

export default function WeddingSite() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      attendance: String(form.get("attendance") ?? ""),
      guestCount: Number(form.get("guestCount") ?? 1),
      dietaryNotes: String(form.get("dietaryNotes") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? "")
    };
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your response could not be saved.");
      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main>
      <nav className="nav">
        <a className="monogram" href="#home" aria-label="Hebron and Noel home">H <span>&</span> N</a>
        <div className="nav-links">
          <a href="#details">The Day</a><a href="#rsvp">RSVP</a><a href="#travel">Travel</a><a href="#gallery">Gallery</a><a href="#faq">FAQ</a>
        </div>
        <a className="nav-cta" href="#rsvp">Kindly reply <span>↗</span></a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-backdrop" role="img" aria-label="Elegant historic wedding venue and garden placeholder" />
        <div className="hero-layout">
          <article className="invitation-card">
            <div className="invitation-photo">
              <div className="invitation-photo-shade" />
              <p className="eyebrow light">PLEASE SAVE THE DATE</p>
              <h1>Hebron <em>&</em><br />Noel</h1>
              <div className="gold-rule"><span>✦</span></div>
              <p className="hero-date">29 MAY 2027</p>
              <p className="hero-location">Addis Ababa, Ethiopia</p>
            </div>
            <div className="paper-tear" />
            <div className="invitation-paper">
              <p className="eyebrow">WITH JOY IN OUR HEARTS</p>
              <h2>Wedding<br /><em>Invitation</em></h2>
              <p>We have been waiting for the moment to celebrate the beginning of our forever with the people we love most.</p>
              <span className="flower-mark">✿</span>
              <a href="#details" className="text-link">THE WEDDING DETAILS ↓</a>
            </div>
            <div className="invitation-foot">A DAY TO REMEMBER · 2027</div>
          </article>
          <div className="mobile-preview-column">
            <article className="mini-page dress-preview">
              <div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>
              <span className="flower-corner">✿</span>
              <p className="eyebrow">A NOTE ON ATTIRE</p>
              <h2>Dress <em>code</em></h2>
              <p className="mini-copy">An elegant celebration calls for your favorite occasion wear.</p>
              <div className="palette-dots"><i/><i/><i/><i/><i/></div>
              <p className="mini-copy">Our palette is inspired by warm creams, soft florals, burgundy, and timeless gold.</p>
              <a href="#faq" className="mini-link">STYLE NOTES</a>
            </article>
            <article className="mini-page program-preview">
              <div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>
              <p className="eyebrow">THE CELEBRATION</p>
              <h2>Wedding<br /><em>program</em></h2>
              <ul><li><span>Time to come</span><span>Guest arrival</span></li><li><span>To be announced</span><span>Ceremony</span></li><li><span>To be announced</span><span>Celebration</span></li></ul>
              <div className="program-photo" />
              <a href="#travel" className="mini-link">PLAN YOUR VISIT ↗</a>
            </article>
          </div>
        </div>
        <div className="hero-side-note">A NEW CHAPTER · 2027</div>
      </section>

      <section className="intro section" id="details">
        <p className="eyebrow">A DAY TO REMEMBER</p>
        <h2>Two lives, one beautiful<br /><em>beginning.</em></h2>
        <p className="intro-copy">With grateful hearts, we invite you to celebrate the beginning of our forever. Your presence will make this day all the more meaningful.</p>
        <div className="date-stamp"><span>SATURDAY</span><strong>29</strong><span>MAY · 2027</span></div>
      </section>

      <section className="event-band">
        <div className="event-item"><span className="event-icon">✧</span><p className="eyebrow">THE CELEBRATION</p><h3>Wedding Day</h3><p>Saturday, May 29, 2027</p><p className="muted">Ceremony time to be announced</p></div>
        <div className="event-divider" />
        <div className="event-item"><span className="event-icon">⌖</span><p className="eyebrow">THE LOCATION</p><h3>Friendship Park 1</h3><p>Addis Ababa, Ethiopia</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Friendship+Park+1+Addis+Ababa+Ethiopia" target="_blank" rel="noreferrer">Open map ↗</a></div>
        <div className="event-divider" />
        <div className="event-item"><span className="event-icon">♡</span><p className="eyebrow">THE INVITATION</p><h3>Celebrate with us</h3><p>We hope you can join us.</p><a className="text-link" href="#rsvp">Please RSVP ↓</a></div>
      </section>

      <section className="rsvp-section section" id="rsvp">
        <div className="rsvp-copy">
          <p className="eyebrow light">KINDLY REPLY</p>
          <h2>Will you join<br />our <em>celebration?</em></h2>
          <p>It would mean the world to have you with us. Please let us know if you’ll be there.</p>
          <div className="rsvp-flourish">H <span>&</span> N</div>
        </div>
        <form className="rsvp-form" onSubmit={submitRsvp}>
          <p className="form-intro">YOUR REPLY</p>
          <label>Full name <input name="fullName" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={120} /></label>
          <label>Email address <span className="optional">(optional)</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} /></label>
          <fieldset><legend>Will you be attending?</legend><label className="radio-label"><input type="radio" name="attendance" value="yes" required /> Joyfully accepts</label><label className="radio-label"><input type="radio" name="attendance" value="no" required /> Regretfully declines</label></fieldset>
          <label>Number of guests, including you <select name="guestCount" defaultValue="1"><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select><span className="field-note">Please follow the guest allowance on your invitation.</span></label>
          <label>Dietary requirements <span className="optional">(optional)</span><input name="dietaryNotes" placeholder="Any dietary needs we should know?" maxLength={500} /></label>
          <label>A note for the couple <span className="optional">(optional)</span><textarea name="message" rows={3} placeholder="Leave us a little message…" maxLength={1000} /></label>
          <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <button className="submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send your RSVP"} <span>↗</span></button>
          {status === "success" && <p className="form-success" role="status">Thank you — your response has been received.</p>}
          {status === "error" && <p className="form-error" role="alert">{error}</p>}
          <p className="privacy-note">Your response is private and will only be used for wedding planning.</p>
        </form>
      </section>

      <section className="travel section" id="travel">
        <p className="eyebrow">MAKE A LITTLE JOURNEY</p>
        <h2>Coming from near<br />or <em>far?</em></h2>
        <p className="section-copy">We can’t wait to welcome you to Addis Ababa. We’ll add helpful travel details here as plans are finalized.</p>
        <div className="travel-grid">
          <article className="travel-card"><span>01 / ARRIVING</span><div className="travel-symbol">✈</div><h3>Getting here</h3><p>Airport information, arrival tips, and transport options will be shared soon.</p><span className="coming-soon">DETAILS COMING SOON</span></article>
          <article className="travel-card"><span>02 / STAYING</span><div className="travel-symbol">⌂</div><h3>Where to stay</h3><p>We’ll list suggested hotels and nearby accommodations for your visit.</p><span className="coming-soon">DETAILS COMING SOON</span></article>
          <article className="travel-card"><span>03 / THE VENUE</span><div className="travel-symbol">⌖</div><h3>Finding us</h3><p>Friendship Park 1<br />Addis Ababa, Ethiopia</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Friendship+Park+1+Addis+Ababa+Ethiopia" target="_blank" rel="noreferrer">View map ↗</a></article>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-heading"><div><p className="eyebrow">LITTLE MOMENTS, BIG LOVE</p><h2>Our story in <em>pictures.</em></h2></div><p>More photographs coming soon</p></div>
        <div className="gallery-grid">
          <div className="gallery-photo photo-one"><span>01</span></div><div className="gallery-photo photo-two"><span>02</span></div><div className="gallery-photo photo-three"><span>03</span></div>
        </div>
        <p className="gallery-caption">A few favorite moments — with more to come.</p>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading"><p className="eyebrow">A FEW HELPFUL NOTES</p><h2>Good to <em>know.</em></h2><p>Have a question? We hope you’ll find the answer here.</p></div>
        <div className="faq-list">{faqs.map((item, index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={item.q}><button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span className="faq-number">0{index + 1}</span><span>{item.q}</span><span className="faq-toggle">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p className="faq-answer">{item.a}</p>}</div>)}</div>
      </section>

      <section className="closing">
        <p className="eyebrow light">UNTIL WE CELEBRATE</p><h2>With love, <em>Hebron & Noel</em></h2><div className="gold-rule"><span>✦</span></div><p>MAY 29, 2027 · ADDIS ABABA, ETHIOPIA</p><a className="hero-button" href="#rsvp">Kindly reply ↑</a>
      </section>
      <footer className="footer"><a className="monogram" href="#home">H <span>&</span> N</a><p>Made with love for our favorite people.</p><a href="#home">BACK TO TOP ↑</a></footer>
    </main>
  );
}