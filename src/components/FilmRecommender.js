import React, { useState } from 'react';
import './FilmRecommender.css';

function FilmRecommender() {
  const [watchedFilms, setWatchedFilms] = useState('');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const moods = ['Mutlu', 'Hüzünlü', 'Heyecanlı', 'Düşünceli', 'Romantik', 'Gerilimli'];
  const genres = ['Aksiyon', 'Komedi', 'Drama', 'Bilim Kurgu', 'Korku', 'Animasyon', 'Belgesel', 'Fark etmez'];

  const getRecommendations = async () => {
    if (!watchedFilms.trim()) {
      setError('Lütfen en az bir film yazın.');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Sen bir film uzmanısın. Kullanıcının izlediği filmlere, ruh haline ve tür tercihine göre kişiselleştirilmiş film önerileri sun.

Kullanıcının izlediği filmler: ${watchedFilms}
Ruh hali: ${mood || 'Belirtilmedi'}
Tercih edilen tür: ${genre || 'Fark etmez'}

Tam olarak bu JSON formatında 5 film öner, başka hiçbir şey yazma:
{
  "oneriler": [
    {
      "isim": "Film Adı",
      "yil": "2019",
      "tur": "Drama, Gerilim",
      "yonetmen": "Yönetmen Adı",
      "imdb": "8.5",
      "neden": "Bu filmi neden beğeneceğini 2 cümleyle açıkla",
      "emoji": "🎬"
    }
  ]
}`
              }]
            }]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API hatası');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      setRecommendations(parsed.oneriler);

    } catch (err) {
      setError('Bir hata oluştu: ' + err.message);
    }

    setLoading(false);
  };

  const clearAll = () => {
    setWatchedFilms('');
    setMood('');
    setGenre('');
    setRecommendations([]);
    setError('');
  };

  return (
    <div className="film-recommender">
      {/* Header */}
      <div className="header">
        <div className="header-icon">🎬</div>
        <h1>Film Öneri Motoru</h1>
        <p>İzlediklerini ve ruh halini anlat, yapay zeka sana özel filmler önersin</p>
      </div>

      {/* Input Bölümü */}
      <div className="input-section">

        {/* İzlenen Filmler */}
        <div className="input-group">
          <label>İzlediğin filmleri yaz <span>(virgülle ayır)</span></label>
          <textarea
            value={watchedFilms}
            onChange={(e) => setWatchedFilms(e.target.value)}
            placeholder="Örn: Inception, The Dark Knight, Interstellar, Parasite..."
            rows={3}
          />
        </div>

        {/* Ruh Hali */}
        <div className="input-group">
          <label>Şu anki ruh halin <span>(opsiyonel)</span></label>
          <div className="mood-grid">
            {moods.map((m) => (
              <button
                key={m}
                className={`mood-btn ${mood === m ? 'active' : ''}`}
                onClick={() => setMood(mood === m ? '' : m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Tür Seçimi */}
        <div className="input-group">
          <label>Tercih ettiğin tür <span>(opsiyonel)</span></label>
          <div className="genre-grid">
            {genres.map((g) => (
              <button
                key={g}
                className={`genre-btn ${genre === g ? 'active' : ''}`}
                onClick={() => setGenre(genre === g ? '' : g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button className="btn-primary" onClick={getRecommendations} disabled={loading}>
            {loading ? '⏳ Öneriler hazırlanıyor...' : '🎯 Öneri Al'}
          </button>
          <button className="btn-secondary" onClick={clearAll}>
            🗑️ Temizle
          </button>
        </div>
      </div>

      {/* Hata */}
      {error && <div className="error-box">{error}</div>}

      {/* Loading */}
      {loading && (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Yapay zeka senin için filmler seçiyor...</p>
        </div>
      )}

      {/* Öneriler */}
      {recommendations.length > 0 && !loading && (
        <div className="results">
          <h2>🍿 Senin İçin Seçilen Filmler</h2>
          <div className="films-grid">
            {recommendations.map((film, index) => (
              <div key={index} className="film-card">
                <div className="film-emoji">{film.emoji}</div>
                <div className="film-info">
                  <div className="film-header">
                    <h3>{film.isim}</h3>
                    <span className="imdb-badge">⭐ {film.imdb}</span>
                  </div>
                  <div className="film-meta">
                    <span className="meta-tag">{film.yil}</span>
                    <span className="meta-tag">{film.tur}</span>
                    <span className="meta-tag">🎥 {film.yonetmen}</span>
                  </div>
                  <p className="film-neden">{film.neden}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmRecommender;