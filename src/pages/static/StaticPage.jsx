import { Link } from "react-router-dom";

const StaticPage = ({ eyebrow, title, description, children }) => {
  return (
    <section className="min-h-[calc(100vh-8rem)] bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-6 py-10 text-white sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
              {description}
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
              {children}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
              <Link
                to="/"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              >
                Back to Home
              </Link>
              <Link
                to="/popular"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Explore Popular Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticPage;
