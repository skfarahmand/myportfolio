import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Mail, Github, Linkedin, FileText, Sparkles } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";
import { site } from "@/data/site";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Credits & Contact — SoraKF" },
      {
        name: "description",
        content: "Thanks for visiting. Get in touch with SoraKF by email, GitHub or LinkedIn.",
      },
      { property: "og:title", content: "Credits & Contact — SoraKF" },
      { property: "og:description", content: "Contact details and a closing thank-you." },
    ],
  }),
  component: CreditsPage,
});

type Status = "idle" | "sending" | "success" | "error";

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: ContactMessage) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SoraKF Portfolio <contact@sorakf.dev>",
        to: ["contact@sorakf.dev"],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        html: `<h2>New portfolio message</h2><p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p><p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend failed:", response.status, details);
      throw new Error(`Resend rejected the message (${response.status}).`);
    }

    return { success: true };
  });

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}

function CreditsPage() {
  return (
    <PageShell title="Credits" intro="The end of one journey — and the beginning of another.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Behind the Realm">
          <div className="border-l-2 border-gold/60 pl-4">
            <p className="text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
              Created By
            </p>
            <p className="mt-2 font-display text-lg uppercase tracking-[0.16em]">
              {site.fullName}
            </p>
          </div>
          <p className="mt-6 text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">
            Roles Along the Journey
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {["Realm Creator", "Frontend Development", "UI & Visual Direction", "Music & Creative Work"].map(
              (role) => (
                <li
                  key={role}
                  className="rounded-sm border border-border bg-secondary/40 px-3 py-2 font-display text-xs uppercase tracking-[0.12em]"
                >
                  {role}
                </li>
              ),
            )}
          </ul>
          <div className="mt-5 rounded-sm border border-gold/25 bg-gold/5 px-4 py-3">
            <CreditRow role="Powered By" name="React, TypeScript & Tailwind CSS" />
          </div>
          <div className="divider-key my-6" />
          <CreditRow
            role="Special Thanks"
            name="Friends, family & every visitor to this realm"
          />
        </Panel>

        <Panel title="Continue the Journey">
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Follow the path beyond this realm, explore the code, or reach out directly.
          </p>
          <ul className="space-y-3">
            <LinkRow
              icon={<FileText className="h-4 w-4" aria-hidden="true" />}
              label="View Résumé"
              href="/resume"
            />
            <LinkRow
              icon={<Github className="h-4 w-4" aria-hidden="true" />}
              label="Explore GitHub"
              href={site.github}
            />
            <LinkRow
              icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
              label="Connect on LinkedIn"
              href={site.linkedin}
            />
            <LinkRow
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              label={site.email}
              href={`mailto:${site.email}`}
            />
          </ul>
          <div className="divider-key my-6" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            SoraKF's Realm is an independently created portfolio inspired by the atmosphere and
            visual language of Kingdom Hearts. It is not affiliated with or endorsed by Square
            Enix or Disney. Referenced trademarks belong to their respective owners.
          </p>
        </Panel>

        <Panel title="Send a Message Across Worlds" className="lg:col-span-2">
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Have a question, an opportunity, or simply want to say hello? Leave a message here.
          </p>
          <ContactForm />
        </Panel>

        <Panel title="The Journey Continues" className="lg:col-span-2">
          <div className="py-5 text-center">
            <Sparkles className="mx-auto mb-4 h-6 w-6 text-gold" aria-hidden="true" />
            <p className="font-display text-xl uppercase tracking-[0.28em] text-gold sm:text-2xl">
              Thank You for Visiting
            </p>
            <p className="mt-4 text-sm tracking-wide text-muted-foreground">
              Until our paths cross again.
            </p>
          </div>
        </Panel>
      </div>
    </PageShell>
  );
}

function CreditRow({ role, name }: { role: string; name: string }) {
  return (
    <li>
      <p className="text-[0.6rem] uppercase tracking-[0.26em] text-muted-foreground">{role}</p>
      <p className="mt-1 font-display uppercase tracking-[0.14em]">{name}</p>
    </li>
  );
}

function LinkRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  const isExternal = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="flex min-h-11 items-center gap-3 rounded-sm border border-border px-4 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold"
      >
        {icon}
        {label}
      </a>
    </li>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const next: Record<string, string> = {};
    if (!values.name) next["name"] = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next["email"] = "Please enter a valid email address.";
    if (!values.subject) next["subject"] = "Please add a subject.";
    if (values.message.length < 10) next["message"] = "Message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await sendContactMessage({ data: values });
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="name" label="Name" error={errors["name"]} />
      <Field id="email" label="Email" type="email" error={errors["email"]} />
      <Field id="subject" label="Subject" error={errors["subject"]} className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors["message"])}
          className="w-full rounded-sm border border-input bg-background/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
        />
        {errors["message"] && (
          <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold/70 bg-gold/15 px-6 py-2.5 font-display text-xs uppercase tracking-[0.22em] transition-colors hover:bg-gold/30"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        <p aria-live="polite" className="text-sm">
          {status === "success" && (
            <span className="text-primary">Your message has been sent.</span>
          )}
          {status === "error" && (
            <span className="text-destructive">
              {Object.keys(errors).length
                ? "Please fix the highlighted fields."
                : "The message could not be sent. Please try again."}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  error,
  className,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string | undefined;
  className?: string | undefined;
}) {

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={Boolean(error)}
        className="min-h-11 w-full rounded-sm border border-input bg-background/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
