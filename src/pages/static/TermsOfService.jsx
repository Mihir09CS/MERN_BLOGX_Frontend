import StaticPage from "./StaticPage";

const TermsOfService = () => {
  return (
    <StaticPage
      eyebrow="Terms of Service"
      title="Basic rules for using DevScribe responsibly"
      description="These terms outline the expectations for publishing content, interacting with others, and using DevScribe in a way that supports a healthy technical community."
    >
      <b>
        <h2>Acceptable use</h2>
      </b>
      <p>
        DevScribe is intended for writing, reading, and discussing content in a
        constructive way. Users should publish material they have the right to
        share and participate respectfully with other members of the platform.
      </p>

      <b>
        <h2>Prohibited content and behavior</h2>
      </b>
      <p>
        Content that is abusive, deceptive, illegal, spammy, infringing, or
        clearly harmful to the community may be removed. Attempts to misuse the
        platform, manipulate engagement, or disrupt service availability are not
        permitted.
      </p>

      <b>
        <h2>Moderation rights</h2>
      </b>
      <p>
        DevScribe reserves the right to review reports, remove content, suspend
        access, or take moderation action when necessary to protect the product
        and its users.
      </p>

      <b>
        <h2>User responsibility</h2>
      </b>
      <p>
        Users remain responsible for the content they publish, the accounts they
        control, and the way they interact with other people on the platform.
        Keeping account credentials secure and using the service in good faith
        are part of that responsibility.
      </p>
    </StaticPage>
  );
};

export default TermsOfService;
