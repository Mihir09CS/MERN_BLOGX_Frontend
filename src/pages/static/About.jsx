import StaticPage from "./StaticPage";

const About = () => {
  return (
    <StaticPage
      eyebrow="About DevScribe"
      title="A focused space for developers who learn in public"
      description="DevScribe is a modern blogging platform for developers, builders, and curious technologists who want to publish ideas, document progress, and exchange practical knowledge."
    >
      <p>
        DevScribe was created to make technical writing feel approachable.
        Whether someone is sharing a frontend experiment, breaking down a backend
        decision, or documenting lessons from a side project, the platform is
        designed to keep the focus on clear ideas and thoughtful community
        interaction.
      </p>

      <h2>What the platform is for</h2>
      <p>
        The goal is simple: give developers a place to publish useful content,
        discover interesting perspectives, and build a body of work over time.
        DevScribe supports long-form posts, community engagement, and profile
        features that help people connect around the topics they care about.
      </p>

      <h2>What we want DevScribe to become</h2>
      <p>
        Over time, the vision is to grow DevScribe into a reliable home for
        high-signal technical content. That means a product that feels clean,
        readable, and trustworthy, with enough structure to support discovery
        without getting in the way of writing.
      </p>
    </StaticPage>
  );
};

export default About;
