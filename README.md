# 🎬 Film Öneri Motoru

React ve Google Gemini API kullanılarak geliştirilmiş, yapay zeka destekli kişiselleştirilmiş film öneri motoru.

---

## 🚀 Özellikler

- 🎯 **Kişiselleştirilmiş Öneriler** — İzlediğin filmlere göre AI destekli öneriler
- 😊 **Ruh Haline Göre Filtreleme** — Mutlu, hüzünlü, heyecanlı ve daha fazlası
- 🎭 **Tür Seçimi** — Aksiyon, Drama, Bilim Kurgu ve diğer türler
- ⭐ **IMDb Puanı** — Her film için IMDb skoru
- 🎥 **Yönetmen Bilgisi** — Film hakkında detaylı bilgi
- 💡 **Neden İzlemeliyim?** — AI'ın kişisel açıklaması

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji          | Açıklama |
| React 18           | Frontend framework |
| Google Gemini API  | AI öneri motoru |
| CSS3               | Özel animasyonlar ve tasarım |

---

## ⚙️ Kurulum

### Gereksinimler
- Node.js 16+
- Google Gemini API Key 

### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/mehmeteminyilmaz/film-recommender.git

# Klasöre gir
cd film-recommender

# Bağımlılıkları yükle
npm install

# .env dosyası oluştur
echo "REACT_APP_GEMINI_API_KEY=your_api_key_here" > .env

# Uygulamayı başlat
npm start
```

---

## 🎮 Kullanım

1. İzlediğin filmleri virgülle ayırarak yaz
2. Ruh halini seç (opsiyonel)
3. Tercih ettiğin türü seç (opsiyonel)
4. **Öneri Al** butonuna bas
5. AI'ın sana özel seçtiği filmlerin keyfini çıkar!

---

## 📁 Proje Yapısı

```
film-recommender/
├── public/
├── src/
│   ├── components/
│   │   ├── FilmRecommender.js
│   │   └── FilmRecommender.css
│   ├── App.js
│   └── App.css
├── .env
└── README.md
```

---

## 🔑 Environment Variables

```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

---

## 📄 Lisans

MIT License © 2025 Mehmet Emin Yılmaz
