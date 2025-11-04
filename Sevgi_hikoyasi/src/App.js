import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Star, Users, Award, RotateCcw, ChevronRight } from 'lucide-react';

const LoveChoicesGame = () => {
  const [gameState, setGameState] = useState('character-creation');
  const [character, setCharacter] = useState({
    name: '',
    gender: 'female',
    outfit: 'elegant',
    personality: 'romantic',
    love: 0,
    loyalty: 0,
    excitement: 0
  });
  const [currentScene, setCurrentScene] = useState(0);
  const [storyPath, setStoryPath] = useState([]);
  const [ending, setEnding] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [heartEmoji, setHeartEmoji] = useState('');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const personalities = [
    { id: 'romantic', name: 'Romantik', icon: '💖', desc: 'Sevgiga ochiq' },
    { id: 'mysterious', name: 'Sirli', icon: '🌙', desc: 'Qiziqarli' },
    { id: 'cheerful', name: 'Quvnoq', icon: '😊', desc: 'Hayotbaxsh' },
    { id: 'loyal', name: 'Sodiq', icon: '🤝', desc: 'Ishonchli' }
  ];

  const outfits = [
    { id: 'elegant', name: 'Nafis', icon: '👗', color: 'from-purple-400 to-pink-400' },
    { id: 'casual', name: 'Oddiy', icon: '👕', color: 'from-blue-400 to-cyan-400' },
    { id: 'formal', name: 'Rasmiy', icon: '🎩', color: 'from-gray-600 to-gray-800' },
    { id: 'romantic', name: 'Romantik', icon: '🌹', color: 'from-red-400 to-pink-500' }
  ];

  const getLoveInterestName = () => {
    return character.gender === 'female' ? 'Ziyodxon' : 'Shaxnoza';
  };

  const scenes = [
    {
      id: 0,
      title: 'Birinchi Uchrashuv',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  
      // Erkak qahramon
      descriptionMale: 'Yoz kuni, quyoshli kunlarda siz sevimli qahvaxonangizda o‘tiribsiz. Siz qizning javoniga tushgan kitobni ko‘rib, tabassum bilan yaqinlashdingiz.',
      dialogueMale: 'Kechirasiz, bu kitobni men ham o‘qigandim! Juda ajoyib asar. Sizning ismingiz nima?',
  
      // Ayol qahramon
      descriptionFemale: 'Yoz kuni, quyoshli kunlarda siz sevimli qahvaxonangizda o‘tiribsiz. Siz biroz uyatchan holda yoningizdan o‘tgan yigitga qaradingiz.',
      dialogueFemale: 'Afsus, qayerdan manzilga borishimni bilmayapman... Siz yo‘lni bilasizmi?',
  
      choices: [
        {
          text: 'Ochiq tabassum bilan tanishing va suhbat boshlang',
          stats: { love: 15, loyalty: 10, excitement: 20 },
          emoji: '😊☕',
          responseFemale: 'U sizning samimiyatingizdan xursand bo‘ldi.',
          responseMale: 'U sizning muloyim va uyatchan javobingizdan xursand bo‘ldi.'
        },
        {
          text: 'Qisqacha javob bering',
          stats: { love: 5, loyalty: 5, excitement: 5 },
          emoji: '🌙✨',
          responseFemale: 'U sizning sirli qiyofangizdan qiziqdi.',
          responseMale: 'U sizning muloyim va mulohazali javobingizdan qiziqdi.'
        },
        {
          text: 'Hazil bilan javob bering va telefon raqam almashing',
          stats: { love: 20, loyalty: 5, excitement: 25 },
          emoji: '😄📱',
          responseFemale: 'U sizning hazil-mutoyibangizdan hayratda qoldi.',
          responseMale: 'U sizning hazil bilan aytgan muloyim so‘zlaringizni kulib qabul qildi.'
        }
      ]
    },
    {
      id: 1,
      title: 'Romantik Sayr',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  
      // Erkak qahramon
      descriptionMale: 'Bir hafta o‘tdi. Siz qizni kechqurun bog‘ga taklif qildingiz. Osmon yulduzlar bilan bezatilgan.',
      dialogueMale: 'Bu yerda siz bilan bo‘lish menga juda yoqdi. Siz o‘ziga xos insonsiz...',
  
      // Ayol qahramon
      descriptionFemale: 'Bir hafta o‘tdi. Siz biroz uyatchan holda bog‘da sayr qilmoqchi bo‘ldingiz. U sizni kutib turibdi.',
      dialogueFemale: 'Bu yerda siz bilan bo‘lish men uchun juda yoqimli. Lekin men biroz uyatchanman...',
  
      choices: [
        {
          text: 'Qo‘lingizni ushlang va "Men ham sizni maxsus his qilaman" deb javob bering',
          stats: { love: 25, loyalty: 20, excitement: 15 },
          emoji: '💑✨',
          responseFemale: 'U sizning qo‘lingizni muloyim ushladi va jilmaydi.',
          responseMale: 'U sizning samimiyatingizni sezib, qo‘lini ushladi.'
        },
        {
          text: 'Tabassum bilan "Yana ko‘risharmizmi?" deb so‘rang',
          stats: { love: 15, loyalty: 15, excitement: 10 },
          emoji: '🌟😊',
          responseFemale: 'U sizga "Albatta!" deb javob berdi.',
          responseMale: 'U sizning muloyim savolingizni eshitib, tabassum bilan javob berdi.'
        },
        {
          text: 'Uyalib "Bu juda tez bo‘lmayaptimi?" deb so‘rang',
          stats: { love: 10, loyalty: 10, excitement: 5 },
          emoji: '😳💭',
          responseFemale: 'U sizning uyatchanligingizni tushundi va jilmaydi.',
          responseMale: 'U sizning ehtiyotkorligingizni qadrladi va kutdi.'
        }
      ]
    },
    {
      id: 2,
      title: 'Sirli Xat',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  
      // Erkak qahramon
      descriptionMale: 'Bir kuni eshigingiz oldida chiroyli sovg‘a va xat topdingiz. Siz uni biroz hayajon bilan ochasiz.',
      dialogueMale: 'Ertaga kechqurun meni kutib turing. Men sizga yuragimni ochaman.',
  
      // Ayol qahramon
      descriptionFemale: 'Bir kuni siz biroz uyatchan holda eshigingiz oldida xat topdingiz. Siz uni ehtiyotkorlik bilan olasiz.',
      dialogueFemale: 'Ertaga kechqurun meni kutib turing. Men sizga biroz yuragimni ochaman...',
  
      choices: [
        {
          text: 'Hayajonlanib Alex ga telefon qiling',
          stats: { love: 20, loyalty: 25, excitement: 30 },
          emoji: '😍📞',
          responseFemale: 'U sizning ovozingizni eshitib xursand bo‘ldi.',
          responseMale: 'U sizning jasorat bilan qilgan harakatingizni qadrladi.'
        },
        {
          text: 'SMS yozing: "Bu juda chiroyli"',
          stats: { love: 15, loyalty: 15, excitement: 20 },
          emoji: '📨💕',
          responseFemale: 'U sizning muloyim xabaringizni ko‘rib jilmaydi.',
          responseMale: 'U sizning samimiyatingizni qadrladi va jilmaydi.'
        },
        {
          text: 'Javob bermasdan kutib turing',
          stats: { love: 5, loyalty: 5, excitement: 10 },
          emoji: '🤔⏰',
          responseFemale: 'U biroz tashvishlandi, lekin sizning uyatchanligingizni tushundi.',
          responseMale: 'U sizning ehtiyotkorligingizni qadrladi va kutdi.'
        }
      ]
    },
    {
      id: 3,
      title: 'Kulminatsiya - Yomg‘irli Kecha',
      background: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  
      // Erkak qahramon
      descriptionMale: 'Kechqurun shahar ko‘chalari yomg‘ir bilan ho‘llanmoqda. Siz qizni uchrashuv joyida kutasiz.',
      dialogueMale: 'Men sizni kutdim... Men sizni... sevaman.',
  
      // Ayol qahramon
      descriptionFemale: 'Kechqurun shahar ko‘chalari yomg‘ir bilan ho‘llanmoqda. Siz biroz uyatchan holda kelasiz.',
      dialogueFemale: 'Men biroz uyatchanman, lekin sizni kutib keldim... Men sizni... sevaman.',
  
      choices: [
        {
          text: 'Men ham seni sevaman! - ochiq tan oling',
          stats: { love: 50, loyalty: 50, excitement: 50 },
          ending: 'happy',
          emoji: '💖💑',
          responseFemale: 'U sizning samimiy tabassumingizni sezib, quchoqladi va mehr bilan javob berdi.',
          responseMale: 'Siz jasorat bilan o\'zingizni tan oldingiz, u quchoqladi va mehr bilan javob berdi.'
        },
        {
          text: 'Men bu hislarni anglamayapman... vaqt kerak',
          stats: { love: 10, loyalty: 10, excitement: 5 },
          ending: 'open',
          emoji: '🌈💭',
          responseFemale: 'U sizning muloyim va uyatchan javobingizni tushundi va "Men kutaman" dedi.',
          responseMale: 'Sizning ehtiyotkor va muloyim javobingizni u tushundi va "Men kutaman" dedi.'
        },
        {
          text: 'Kechirasiz, men buni qila olmayman',
          stats: { love: 0, loyalty: 0, excitement: 0 },
          ending: 'drama',
          emoji: '💔😢',
          responseFemale: 'U sizning muloyim rad javobingizni qabul qilib, ketdi.',
          responseMale: 'Sizning aniq va to\'g\'ridan-to\'g\'ri rad javobingizdan keyin u ketdi.'
        }
      ]
    }
  ];
  

  const endings = {
    happy: {
      title: 'Baxtli Tugam',
      descriptionFemale: 'Siz va Ziyodxon sevgi bilan birga bo\'ldingiz!',
      descriptionMale: 'Siz va Shaxnoza sevgi bilan birga bo\'ldingiz!',
      color: 'from-pink-500 to-rose-500',
      icon: '💑'
    },
    open: {
      title: 'Ochiq Tugam',
      descriptionFemale: 'Hikoya tugamadi. Kelajakda Ziyodxon bilan nima bo\'lishi mumkin?',
      descriptionMale: 'Hikoya tugamadi. Kelajakda Shaxnoza bilan nima bo\'lishi mumkin?',
      color: 'from-purple-500 to-indigo-500',
      icon: '🌠'
    },
    drama: {
      title: 'Drama Tugam',
      descriptionFemale: 'Ba\'zan sevgi murakkab. Lekin har bir tajriba sizni kuchliroq qiladi.',
      descriptionMale: 'Ba\'zan sevgi murakkab. Lekin har bir tajriba sizni kuchliroq qiladi.',
      color: 'from-gray-600 to-gray-800',
      icon: '🌧️'
    }
  };

  useEffect(() => {
    if (gameState === 'playing' || gameState === 'ending') {
      const timer = setTimeout(() => setShowAnimation(true), 100);
      return () => clearTimeout(timer);
    }
  }, [gameState, currentScene]);

  useEffect(() => {
    if (gameState === 'playing' || gameState === 'ending') {
      initCanvas();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, currentScene]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 20,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        alpha: 0.3 + Math.random() * 0.4
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hearts.forEach(heart => {
        heart.x += heart.speedX;
        heart.y += heart.speedY;
        
        if (heart.x < 0 || heart.x > canvas.width) heart.speedX *= -1;
        if (heart.y < 0 || heart.y > canvas.height) heart.speedY *= -1;
        
        ctx.globalAlpha = heart.alpha;
        ctx.font = `${heart.size}px Arial`;
        ctx.fillText('💖', heart.x, heart.y);
      });
      
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const handleChoice = (choice) => {
    setShowAnimation(false);
    setHeartEmoji(choice.emoji);
    
    setTimeout(() => setHeartEmoji(''), 2000);
    
    const newCharacter = {
      ...character,
      love: Math.min(100, character.love + choice.stats.love),
      loyalty: Math.min(100, character.loyalty + choice.stats.loyalty),
      excitement: Math.min(100, character.excitement + choice.stats.excitement)
    };
    
    setCharacter(newCharacter);
    setStoryPath([...storyPath, { scene: currentScene, choice: choice.text }]);

    if (choice.ending) {
      setEnding(choice.ending);
      setGameState('ending');
    } else if (currentScene < scenes.length - 1) {
      setTimeout(() => {
        setCurrentScene(currentScene + 1);
      }, 2000);
    }
  };

  const startGame = () => {
    if (character.name.trim()) {
      setGameState('playing');
    }
  };

  const resetGame = () => {
    setCharacter({
      name: '',
      gender: 'female',
      outfit: 'elegant',
      personality: 'romantic',
      love: 0,
      loyalty: 0,
      excitement: 0
    });
    setCurrentScene(0);
    setStoryPath([]);
    setEnding(null);
    setGameState('character-creation');
  };

  const StatBar = ({ label, value, icon: Icon, color }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color.replace('text-', 'from-')} to-white transition-all duration-1000 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  if (gameState === 'character-creation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-6 overflow-y-auto relative">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 pt-8">
            <div className="flex items-center justify-center gap-3 mb-4 animate-bounce">
              <Heart className="w-16 h-16 text-red-500 drop-shadow-2xl" />
              <h1 className="text-7xl font-bold text-white drop-shadow-2xl">Love Choices</h1>
              <Heart className="w-16 h-16 text-red-500 drop-shadow-2xl" />
            </div>
            <p className="text-2xl text-white/90 font-medium drop-shadow-lg">Sevgi hikoyangizni yarating 💕</p>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-4 border-pink-200">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8 text-center">
              ✨ Qahramoningizni Yarating ✨
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-xl font-bold text-gray-800 mb-4">Ismingiz</label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => setCharacter({...character, name: e.target.value})}
                  placeholder="Ismingizni kiriting..."
                  className="w-full px-6 py-5 text-xl border-4 border-pink-300 rounded-3xl focus:outline-none focus:border-pink-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-gray-800 mb-4">Jinsingiz</label>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={() => setCharacter({...character, gender: 'female'})}
                    className={`p-8 rounded-3xl font-bold text-xl transition-all duration-300 ${
                      character.gender === 'female'
                        ? 'bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-2xl scale-110'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-6xl mb-3">👩</div>
                    Ayol
                  </button>
                  <button
                    onClick={() => setCharacter({...character, gender: 'male'})}
                    className={`p-8 rounded-3xl font-bold text-xl transition-all duration-300 ${
                      character.gender === 'male'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-2xl scale-110'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-6xl mb-3">👨</div>
                    Erkak
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-gray-800 mb-4">Kiyim</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {outfits.map(outfit => (
                    <button
                      key={outfit.id}
                      onClick={() => setCharacter({...character, outfit: outfit.id})}
                      className={`p-8 rounded-3xl font-bold transition-all duration-300 ${
                        character.outfit === outfit.id
                          ? `bg-gradient-to-r ${outfit.color} text-white shadow-2xl scale-110`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-6xl mb-3">{outfit.icon}</div>
                      <div className="text-lg">{outfit.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-gray-800 mb-4">Shaxsiyat</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {personalities.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setCharacter({...character, personality: p.id})}
                      className={`p-8 rounded-3xl transition-all duration-300 ${
                        character.personality === p.id
                          ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-2xl scale-110'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-6xl mb-3">{p.icon}</div>
                      <div className="font-bold text-lg mb-2">{p.name}</div>
                      <div className="text-sm opacity-90">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              disabled={!character.name.trim()}
              className={`w-full mt-10 py-6 rounded-3xl font-bold text-2xl transition-all duration-300 flex items-center justify-center gap-4 ${
                character.name.trim()
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:shadow-2xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-8 h-8" />
              Hikoyani Boshlash
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'ending' && ending) {
    const endingData = endings[ending];
    const endingDescription = character.gender === 'female' ? endingData.descriptionFemale : endingData.descriptionMale;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-6 flex items-center justify-center relative">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        <div className={`max-w-4xl w-full bg-gradient-to-br ${endingData.color} rounded-3xl p-12 shadow-2xl transform ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} transition-all duration-1000 relative z-10`}>
          <div className="text-center text-white">
            <div className="text-9xl mb-8 animate-bounce">{endingData.icon}</div>
            <h1 className="text-6xl font-bold mb-6">{endingData.title}</h1>
            <p className="text-3xl mb-10 leading-relaxed">{endingDescription}</p>
            
            <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-10 mb-10">
              <h3 className="text-3xl font-bold mb-8">Statistikangiz</h3>
              <div className="space-y-6">
                <div className="flex justify-between text-2xl bg-white/20 p-5 rounded-2xl">
                  <span>💖 Sevgi:</span>
                  <span className="font-bold">{character.love}%</span>
                </div>
                <div className="flex justify-between text-2xl bg-white/20 p-5 rounded-2xl">
                  <span>🤝 Sadoqat:</span>
                  <span className="font-bold">{character.loyalty}%</span>
                </div>
                <div className="flex justify-between text-2xl bg-white/20 p-5 rounded-2xl">
                  <span>✨ Hayajon:</span>
                  <span className="font-bold">{character.excitement}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="px-12 py-6 bg-white text-purple-600 rounded-3xl font-bold text-2xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 inline-flex items-center gap-4"
            >
              <RotateCcw className="w-8 h-8" />
              Qaytadan O'ynash
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scene = scenes[currentScene];
  const sceneDescription = character.gender === 'female' ? scene.descriptionFemale : scene.descriptionMale;
  const sceneDialogue = character.gender === 'female' ? scene.dialogueFemale : scene.dialogueMale;
  const loveInterestName = getLoveInterestName();

  return (
    <div 
      className="min-h-screen p-6 transition-all duration-1000 relative overflow-hidden"
      style={{ background: scene.background }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />
      
      {heartEmoji && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-9xl animate-ping">{heartEmoji}</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={`bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl transform ${showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-1000`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  {scene.title}
                </h2>
                <div className="text-lg font-semibold text-gray-600 bg-purple-100 px-4 py-2 rounded-full">
                  {currentScene + 1}/{scenes.length}
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                <p className="text-xl text-gray-800 leading-relaxed mb-4">{sceneDescription}</p>
                <div className="flex items-start gap-3 p-5 bg-white/80 rounded-xl">
                  <Heart className="w-8 h-8 text-red-500 flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <p className="font-bold text-gray-800 mb-2 text-lg">{loveInterestName}:</p>
                    <p className="text-gray-700 italic text-lg">{sceneDialogue}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  Tanlovingiz:
                </h3>
                {scene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full p-6 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-purple-400"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{choice.emoji}</span>
                      <p className="font-bold text-gray-800 text-lg">{choice.text}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 ml-12">
                      <span className="flex items-center gap-1 bg-red-100 px-3 py-1 rounded-full">
                        <Heart className="w-4 h-4 text-red-500" />
                        +{choice.stats.love}
                      </span>
                      <span className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                        <Users className="w-4 h-4 text-blue-500" />
                        +{choice.stats.loyalty}
                      </span>
                      <span className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-500" />
                        +{choice.stats.excitement}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-7xl shadow-2xl animate-bounce">
                  {character.gender === 'female' ? '👩' : '👨'}
                </div>
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  {character.name}
                </h3>
                <p className="text-lg text-gray-600 mt-2 font-semibold">
                  {personalities.find(p => p.id === character.personality)?.name} {personalities.find(p => p.id === character.personality)?.icon}
                </p>
              </div>

              <div className="space-y-1 bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-2xl">
                <StatBar label="Sevgi" value={character.love} icon={Heart} color="text-red-300" />
                <StatBar label="Sadoqat" value={character.loyalty} icon={Users} color="text-blue-300" />
                <StatBar label="Hayajon" value={character.excitement} icon={Sparkles} color="text-yellow-300" />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                Yutuqlar
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <span className="text-base text-gray-700 font-semibold">Sahnalar:</span>
                  <span className="font-bold text-purple-600 text-xl">{currentScene + 1}/{scenes.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                  <span className="text-base text-gray-700 font-semibold">Tanlovlar:</span>
                  <span className="font-bold text-purple-600 text-xl">{storyPath.length}</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl font-bold text-gray-700 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Qaytadan Boshlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveChoicesGame;