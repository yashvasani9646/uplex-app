import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";

const Blogdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= GET BLOGS =================

  useEffect(() => {
    axios
      .get(`${API_URL}/public/blogs`)
      .then((res) => {
        const allBlogs = res.data;

        setBlogs(allBlogs);

        const selectedBlog = allBlogs.find(
          (item) => String(item.id) === String(id)
        );

        setBlog(selectedBlog);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_URL, id]);

  // ================= PARSE BLOG CONTENT =================

  let blogContent = [];

  if (blog) {
    try {
      const parsedContent = JSON.parse(blog.description);

      if (Array.isArray(parsedContent)) {
        blogContent = parsedContent;
      } else {
        blogContent = [
          {
            type: "paragraph",
            value: blog.description,
          },
        ];
      }
    } catch  {
      // Old blogs
      blogContent = [
        {
          type: "paragraph",
          value: blog.description,
        },
      ];
    }
  }

  // ================= RECENT BLOGS =================

  const recentBlogs = blogs
    .filter((item) => String(item.id) !== String(id))
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 4);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading blog...</p>
      </div>
    );
  }

  // ================= BLOG NOT FOUND =================

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Blog not found</p>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white"
        >
          <FaArrowLeft size={12} />
          Back
        </button>
      </div>
    );
  }

  // ================= DATE =================

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // ================= SHARE =================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Blog link copied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* ================= TOP HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

          {/* BACK */}

          <button
            onClick={() => navigate(-1)}
            className="flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-indigo-400 hover:text-indigo-500"
          >
            <FaArrowLeft size={12} />
            Back
          </button>

          {/* SHARE */}

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-400">
              Share
            </span>

            <button
              onClick={handleShare}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-500"
            >
              <FaShareAlt size={12} />
            </button>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-500"
            >
              <FaFacebookF size={12} />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-500"
            >
              <FaTwitter size={12} />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-500"
            >
              <FaLinkedinIn size={12} />
            </a>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* ================= LEFT ================= */}

          <main>

            {/* DATE */}

            <div className="mb-4">
              <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-500">
                {formattedDate}
              </span>
            </div>

            {/* TITLE */}

            <h1 className="max-w-[900px] text-3xl font-bold leading-tight text-[#0b1633] sm:text-4xl lg:text-[42px]">
              {blog.title}
            </h1>

            {/* IMAGE */}

            <div className="mt-7 overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-[260px] w-full object-cover sm:h-[400px] lg:h-[500px]"
              />
            </div>

            {/* ================= BLOG CONTENT ================= */}

            <article className="mt-8">

              {blogContent.map((item, index) => {

                if (item.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="mt-9 text-xl font-bold leading-tight text-[#0b1633] sm:text-2xl"
                    >
                      {item.value}
                    </h2>
                  );
                }

                return (
                  <p
                    key={index}
                    className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-600 sm:text-[16px]"
                  >
                    {item.value}
                  </p>
                );
              })}

            </article>
          </main>

          {/* ================= RIGHT SIDEBAR ================= */}

          <aside>

            {/* SEARCH */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[#0b1633]">
                Search
              </h2>

              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3">

                <FaSearch
                  size={13}
                  className="shrink-0 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />

              </div>
            </div>

            {/* RECENT POSTS */}

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-lg font-bold text-[#0b1633]">
                  Recent Posts
                </h2>

                <span className="text-xs text-indigo-500">
                  {recentBlogs.length}
                </span>

              </div>

              <div className="space-y-5">

                {recentBlogs.length > 0 ? (
                  recentBlogs.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/blog/${item.id}`)}
                      className="group flex w-full gap-3 text-left"
                    >

                      <img
                       src={item.image}
                        alt={item.title}
                        className="h-[65px] w-[75px] shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0">

                        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[#0b1633] transition group-hover:text-indigo-500">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          {formattedDate}
                        </p>

                      </div>

                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No recent posts found.
                  </p>
                )}

              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Blogdetails;