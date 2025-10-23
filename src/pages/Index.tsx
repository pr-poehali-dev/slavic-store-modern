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
    name: 'Велесова Роса',
    category: 'Парфюм',
    price: 4500,
    description: 'Аромат древних лесов с нотами можжевельника, дубового мха и белого кедра',
    myth: 'Велес — бог мудрости и магии, покровитель лесов',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/44f5a0a2-2ca2-4d78-a07e-cb9e973e7f3d.jpg'
  },
  {
    id: 2,
    name: 'Макошь',
    category: 'Крем',
    price: 2800,
    description: 'Питательный крем с экстрактом льна и медовой росы',
    myth: 'Макошь — богиня плодородия и женской судьбы',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/44f5a0a2-2ca2-4d78-a07e-cb9e973e7f3d.jpg'
  },
  {
    id: 3,
    name: 'Перунов Огонь',
    category: 'Диффузор',
    price: 3200,
    description: 'Пряный аромат с нотами можжевельника, сандала и дымка',
    myth: 'Перун — бог грозы, покровитель воинов',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/44f5a0a2-2ca2-4d78-a07e-cb9e973e7f3d.jpg'
  },
  {
    id: 4,
    name: 'Лада',
    category: 'Парфюм',
    price: 4200,
    description: 'Нежный цветочный аромат с акцентами белых трав и росы',
    myth: 'Лада — богиня любви, красоты и семейного очага',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/44f5a0a2-2ca2-4d78-a07e-cb9e973e7f3d.jpg'
  },
  {
    id: 5,
    name: 'Сварожья Купель',
    category: 'Крем',
    price: 3100,
    description: 'Восстанавливающий крем с экстрактом березовых почек',
    myth: 'Сварог — бог-творец, создатель мира',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/44f5a0a2-2ca2-4d78-a07e-cb9e973e7f3d.jpg'
  },
  {
    id: 6,
    name: 'Морена',
    category: 'Диффузор',
    price: 2900,
    description: 'Таинственный аромат зимнего леса с хвоей и ягодами',
    myth: 'Морена — богиня зимы и возрождения',
    image: 'https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/44f5a0a2-2ca2-4d78-a07e-cb9e973e7f3d.jpg'
  }
];

const myths = [
  {
    title: 'Велес — Хранитель Лесов',
    text: 'В древних славянских преданиях Велес был богом мудрости, магии и скота. Его образ тесно связан с дремучими лесами, где он являлся проводником между мирами. Наш аромат "Велесова Роса" воссоздает атмосферу священных дубрав.'
  },
  {
    title: 'Макошь — Пряха Судеб',
    text: 'Макошь — великая богиня, прядущая нити судьбы у космического колодца. Она покровительствует женским ремеслам, плодородию и семейному очагу. В ее честь создан крем, дарующий силу и красоту.'
  },
  {
    title: 'Перун — Громовержец',
    text: 'Перун — верховный бог-громовержец, повелитель небесного огня. Его оружие — молнии, его стихия — гроза. Диффузор "Перунов Огонь" передает мощь и величие этого божества через пряные древесные ноты.'
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
            <h1 className="text-2xl font-display font-bold text-foreground">Старославянские Ароматы</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <button onClick={() => setCurrentSection('hero')} className="text-foreground hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => setCurrentSection('catalog')} className="text-foreground hover:text-primary transition-colors">
              Каталог
            </button>
            <button onClick={() => setCurrentSection('myths')} className="text-foreground hover:text-primary transition-colors">
              Мифы
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
              backgroundImage: 'url(https://cdn.poehali.dev/projects/d9e499a8-5a4d-4d69-ae8a-a68f13514481/files/34679bc7-e467-4596-a0e3-792f4e70af29.jpg)',
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
              Ароматы Древних Богов
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Нишевая парфюмерия, вдохновленная старославянской мифологией
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => setCurrentSection('catalog')}>
                Открыть каталог
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur border-white text-white hover:bg-white hover:text-foreground" onClick={() => setCurrentSection('myths')}>
                История ароматов
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
                Каждый аромат — это путешествие в мир славянских легенд и преданий
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
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">История Ароматов</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Узнайте больше о славянских богах, вдохновивших нашу коллекцию
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
                Нишевая парфюмерия с душой древних славян
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
            © 2024 Старославянские Ароматы. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
