import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  myth: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Банник',
    category: 'Парфюм',
    price: 4500,
    description: 'Аромат березового веника, дегтярного мыла и горячего пара. Ноты: береза, деготь, липа',
    myth: 'Дух бани, живущий за печкой. По поверьям, моются только в его присутствие',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 2,
    name: 'Кикимора Болотная',
    category: 'Крем',
    price: 2800,
    description: 'Крем с торфом, мхом и багульником. Увлажняет как утренняя болотная дымка',
    myth: 'Хозяйка болот и трясин, заманивает путников огоньками',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 3,
    name: 'Домовой',
    category: 'Диффузор',
    price: 3200,
    description: 'Запах старого дома: печное тепло, сухие травы на чердаке, пыльные половицы',
    myth: 'Хранитель домашнего очага, живет за печкой и охраняет покой семьи',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 4,
    name: 'Русалка',
    category: 'Парфюм',
    price: 4200,
    description: 'Водяная свежесть с нотами речной тины, кувшинок и ивовых сережек',
    myth: 'Девы-утопленницы, живущие в реках и заманивающие путников на Русальной неделе',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 5,
    name: 'Леший',
    category: 'Крем',
    price: 3100,
    description: 'Крем с экстрактом мха, еловой смолы и грибного мицелия',
    myth: 'Хозяин леса, сбивающий с пути тех, кто не уважает его владения',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 6,
    name: 'Полуночница',
    category: 'Диффузор',
    price: 2900,
    description: 'Ночной аромат: полынь, можжевельник, дымок гаснущей свечи',
    myth: 'Приходит в полночь к непослушным детям и тем, кто работает после заката',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 7,
    name: 'Овинник',
    category: 'Парфюм',
    price: 3800,
    description: 'Запах высушенного зерна, соломы и теплого овина. Ноты: пшеница, сено, дым',
    myth: 'Дух, охраняющий овин — место сушки снопов. Не любит шума и непорядка',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 8,
    name: 'Водяной',
    category: 'Крем',
    price: 2700,
    description: 'Освежающий крем с речными водорослями и экстрактом камыша',
    myth: 'Хозяин водоемов, требующий жертв и топящий нерадивых купальщиков',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  },
  {
    id: 9,
    name: 'Шишига',
    category: 'Диффузор',
    price: 3100,
    description: 'Запах заброшенных изб: пыль, гнилое дерево, забытые вещи',
    myth: 'Мелкая нечисть, живущая в заброшенных домах и хулиганящая по ночам',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/39bf1485-389b-4ed2-bbc7-8381f4c48b59.jpg'
  }
];

const myths = [
  {
    title: 'Банник — Дух Бани',
    text: 'Банник живет за печкой в каждой русской бане. Считается, что без его разрешения нельзя париться после полуночи. Наш аромат передает атмосферу традиционной бани: березовый веник, дегтярное мыло, горячий пар и липовый настой.'
  },
  {
    title: 'Домовой — Хранитель Очага',
    text: 'Домовой — самый добрый из нечисти. Он живет за печкой, следит за порядком и оберегает дом от бед. Наш диффузор воссоздает запах старого деревенского дома: теплая печь, сухие травы на чердаке, половицы из сосны.'
  },
  {
    title: 'Леший — Хозяин Леса',
    text: 'Леший может сбить с пути любого, кто входит в лес без уважения. Он охраняет зверей и деревья. Аромат передает дух дремучего леса: мох, еловая смола, грибы и влажная земля после дождя.'
  },
  {
    title: 'Русалки на Русальной Неделе',
    text: 'После Троицы русалки выходят из воды и качаются на ветвях ив. В это время нельзя купаться и ходить к реке одному. Наш парфюм — это запах речного берега: кувшинки, тина, ива и утренний туман над водой.'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentSection, setCurrentSection] = useState<'hero' | 'catalog' | 'myths'>('hero');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✦</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Нечистая Сила</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button onClick={() => setCurrentSection('hero')} className="text-foreground hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => setCurrentSection('catalog')} className="text-foreground hover:text-primary transition-colors">
              Каталог
            </button>
            <button onClick={() => setCurrentSection('myths')} className="text-foreground hover:text-primary transition-colors">
              Предания
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-display">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-secondary rounded-lg">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-display font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, -1)}>
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, 1)}>
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto" onClick={() => removeFromCart(item.id)}>
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                          <p className="text-sm font-semibold mt-2">{item.price * item.quantity} ₽</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-display font-bold mb-4">
                        <span>Итого:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {currentSection === 'hero' && (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/a022ca1a-fc36-4406-bf3c-ad02fb674222.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 z-10" style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/25050309-df14-4c28-ad0c-565b221740d8.jpg)',
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
            opacity: 0.1
          }} />
          
          <div className="container mx-auto px-4 z-20 text-center animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-24 h-1 bg-primary mx-auto mb-4" />
              <div className="flex gap-2 justify-center mb-4">
                <span className="text-primary text-4xl">✦</span>
                <span className="text-primary text-4xl">❋</span>
                <span className="text-primary text-4xl">✦</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Ароматы Нечистой Силы
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Парфюмерия, вдохновленная славянскими преданиями о духах, нечисти и забытых традициях
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => setCurrentSection('catalog')}>
                Открыть каталог
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-foreground" onClick={() => setCurrentSection('myths')}>
                Старые предания
              </Button>
            </div>
          </div>
        </section>
      )}

      {currentSection === 'catalog' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Каталог</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Каждый аромат — это воспоминание о старых традициях, духах и забытых ритуалах
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-white">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-display font-bold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 italic">{product.myth}</p>
                    <p className="text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)} className="gap-2">
                        <Icon name="ShoppingCart" size={16} />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentSection === 'myths' && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Старые Предания</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Узнайте больше о нечистой силе и духах, вдохновивших нашу коллекцию
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {myths.map((myth, idx) => (
                <Card key={idx} className="p-8 animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl text-primary">✦</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-3">{myth.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{myth.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-foreground text-background py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display font-bold text-lg mb-4">О нас</h3>
              <p className="text-sm text-background/80">
                Ароматы старых преданий и забытых традиций
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Каталог</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>Парфюмерия</li>
                <li>Кремы</li>
                <li>Диффузоры</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Информация</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li>Доставка и оплата</li>
                <li>Контакты</li>
                <li>О производстве</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-4">Контакты</h3>
              <p className="text-sm text-background/80">
                info@slavic-aromas.ru<br />
                +7 (999) 123-45-67
              </p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
            © 2024 Нечистая Сила. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}