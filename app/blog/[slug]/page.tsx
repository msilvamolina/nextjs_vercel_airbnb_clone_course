"use client";

import { useEffect, useState, useRef } from "react";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Función para limpiar y convertir un título en un slug válido
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Quita caracteres especiales
      .replace(/\s+/g, "-"); // Reemplaza espacios con guiones
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=tesla&from=2025-02-13&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWSAPI}`
        );
        const data = await response.json();
        setArticles(data.articles.slice(0, 10)); // Tomamos solo 10 noticias
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (!articles.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newSlug = entry.target.getAttribute("data-slug");
            const articleTitle = entry.target.getAttribute("data-title");

            if (newSlug && newSlug !== currentArticle) {
              setCurrentArticle(newSlug);

              // 🔥 Cambia la URL sin refrescar la página
              window.history.replaceState(null, "", `/blog/${newSlug}`);

              // 🔥 Cambia el título de la pestaña del navegador
              if (articleTitle) {
                document.title = `${articleTitle} - Blog de Noticias`;
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const titles = document.querySelectorAll(".article-title");
    titles.forEach((title) => observer.observe(title));

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [articles, currentArticle]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Noticias sobre Tesla</h1>

      {articles.map((article, index) => {
        const slug = createSlug(article.title); // Generamos un slug limpio
        return (
          <div key={index} className="mb-12">
            <h2
              className="article-title text-2xl font-semibold mb-2"
              data-slug={slug}
              data-title={article.title} // Guardamos el título para cambiarlo después
            >
              {article.title}
            </h2>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-60 object-cover mb-2"
              />
            )}
            <p>{article.content}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Leer más
            </a>
          </div>
        );
      })}
    </div>
  );
}
