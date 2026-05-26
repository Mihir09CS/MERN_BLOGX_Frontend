import StaticPage from "./StaticPage";

const PrivacyPolicy = () => {
  return (
    <StaticPage
      eyebrow="Privacy Policy"
      title="How DevScribe handles account data and platform activity"
      description="This overview explains the core information DevScribe uses to operate the platform and support sign-in, publishing, and community features."
    >
      <b>
        <h2>Account and authentication data</h2>
      </b>
      <p>
        DevScribe stores the information needed to create and secure accounts,
        including items such as name, email address, authentication method, and
        related account preferences. If you sign in with Google OAuth, DevScribe
        uses the account details required to authenticate and link your profile.
      </p>

      <b>
        <h2>Local storage and session state</h2>
      </b>
      <p>
        The app may use browser storage, including localStorage, to keep users
        signed in and preserve basic session state. This helps the product
        maintain navigation continuity and protected-route access across
        reloads.
      </p>

      <b>
        <h2>User-generated content</h2>
      </b>
      <p>
        Posts, comments, profile details, and other content you publish on
        DevScribe are stored so they can be displayed, moderated, and connected
        to your account activity on the platform.
      </p>

      <b>
        <h2>Third-party services</h2>
      </b>
      <p>
        DevScribe may rely on third-party services to support product features,
        including Google OAuth for authentication, ImageKit for media handling,
        and related infrastructure providers that help operate the application
        securely and reliably.
      </p>
    </StaticPage>
  );
};

export default PrivacyPolicy;
