import React, { useState, useEffect } from 'react';
import mockupImg from './assets/spreadsheet_mockup.png';
import logoImg from './assets/logo.png';
import './App.css';

export default function App() {
  // 15 minutes (900 seconds) countdown timer
  const [secondsLeft, setSecondsLeft] = useState(900);
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Initialize FB Pixel and setup timer
  useEffect(() => {
    // 1. Facebook Pixel setup
    try {
      if (!window.fbq) {
        /* eslint-disable */
        (function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/pt_BR/fbevents.js'));
        /* eslint-enable */
        window.fbq('init', '731863903053666');
      }
      window.fbq('track', 'PageView');
    } catch (err) {
      console.warn("FB Pixel load failed (likely ad blocker):", err);
    }

    // 2. Countdown Timer Logic
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 900; // Reset to 15 min when reaching zero to keep urgency active
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time (MM:SS)
  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Track CTA click
  const handleCtaClick = () => {
    try {
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout');
      }
    } catch (err) {
      console.warn("FB Pixel tracking failed:", err);
    }
  };

  // FAQ list
  const faqs = [
    {
      q: "Preciso entender muito de matemática ou Excel?",
      a: "Não! A planilha foi desenvolvida para ser 100% visual e automatizada. Você só precisa preencher campos básicos (como entradas e saídas diárias) e ela faz todo o cálculo e gera os gráficos sozinha."
    },
    {
      q: "Como funciona o Desafio de 21 Dias?",
      a: "Você receberá um passo a passo simples e prático por dia. Cada dia foca em uma pequena tarefa de menos de 15 minutos. Esse método foi desenhado para guiar você do completo caos financeiro à total organização, sem sofrimento."
    },
    {
      q: "Quando e como eu recebo o acesso?",
      a: "O acesso é imediato! Assim que o pagamento for aprovado (o Pix aprova em menos de 1 minuto), você receberá um e-mail com os dados de acesso para fazer o download da planilha e dos bônus."
    },
    {
      q: "A planilha funciona no celular?",
      a: "Sim! Ela funciona perfeitamente tanto no computador (Google Sheets ou Excel) quanto no celular, para você registrar seus gastos e controlar suas metas em qualquer lugar."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center font-sans antialiased selection:bg-green-500 selection:text-slate-950">
      
      {/* Top Banner - Urgency */}
      <div className="w-full bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-semibold tracking-wide shadow-md">
        ⚠️ ATENÇÃO: Seu desconto especial de <span className="underline font-bold">86% OFF</span> foi ativado. Aproveite antes que expire!
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl w-full flex-grow flex flex-col items-center px-4 py-8 md:py-12">
        
        {/* Logo */}
        <div className="mb-6 mt-2 max-w-[320px]">
          <img src={logoImg} alt="Desafio Controle Financeiro" className="w-full h-auto object-contain" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center leading-tight tracking-tight text-white mb-6">
          Descubra o Desafio de 21 Dias para <span className="text-red-500 underline decoration-2">Organizar Suas Finanças</span> e Quitar Suas Dívidas
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-300 text-center mb-8 font-light max-w-xl">
          Veja como pessoas comuns estão saindo do vermelho e multiplicando suas economias sem fórmulas complexas de Excel ou restrições extremas.
        </p>

        {/* Live Countdown Timer Widget */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-6 py-3 mb-8 flex items-center justify-center gap-3 backdrop-blur-sm shadow-inner w-full max-w-md">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <p className="text-xs md:text-sm text-slate-300 font-medium">
            O preço promocional de R$197 por <span className="text-green-400 font-bold">R$ 27</span> expira em: 
            <span className="text-red-400 font-mono font-bold ml-2 text-base">{formatTime()}</span>
          </p>
        </div>

        {/* Mockup Image Product Preview */}
        <div className="relative mb-10 w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-40"></div>
          {/* Top Browser Header Bar */}
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-1.5 border-b border-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 block"></span>
            <span className="text-[10px] text-slate-400 font-mono ml-4 select-none">planilha_financeira_v2.xls</span>
          </div>
          <img 
            src={mockupImg} 
            alt="Mockup Planilha Financeira" 
            className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
            loading="eager"
          />
        </div>

        {/* Persuative Features & Benefits */}
        <div className="w-full bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10 shadow-lg backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
            🚀 O Que Você Vai Receber no Desafio:
          </h2>
          <ul className="space-y-4 text-slate-300 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">✔</span>
              <div>
                <strong className="text-white">Desafio Prático de 21 Dias:</strong> Pequenas tarefas diárias (menos de 15 min) para reestruturar sua mentalidade e controle financeiro.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">✔</span>
              <div>
                <strong className="text-white">Planilha Automática Inteligente:</strong> Acesso à planilha de orçamento totalmente automatizada e fácil de mexer.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">✔</span>
              <div>
                <strong className="text-white">Plano de Eliminação de Dívidas:</strong> O passo a passo para mapear e quitar o seu endividamento sem juros abusivos.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-lg flex-shrink-0 mt-0.5">✔</span>
              <div>
                <strong className="text-white">Suporte Exclusivo e Bônus Extras:</strong> Tutoriais exclusivos e ebooks práticos inclusos de graça hoje (economize R$ 149,90).
              </div>
            </li>
          </ul>
        </div>

        {/* Big Pulsating CTA Button Section */}
        <div className="w-full text-center mb-10">
          <a
            href="https://pay.kiwify.com.br/poBJNUr?afid=3K01qYdx"
            onClick={handleCtaClick}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-green-500 hover:bg-green-400 text-slate-950 font-extrabold py-5 px-8 rounded-2xl text-xl md:text-2xl shadow-xl transition-all duration-300 transform active:scale-95 animate-pulse-slow border border-green-300/20"
          >
            QUERO ORGANIZAR MINHAS FINANÇAS AGORA
          </a>
          
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746a1 1 0 0 1 .586.904v8.32a1 1 0 0 1-.586.904L10 18.77l-7.834-3.746A1 1 0 0 1 1.58 14.12V5.804a1 1 0 0 1 .586-.905zM10 3.3l-6 2.87v6.628l6 2.87 6-2.87V6.17L10 3.3zM10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
              </svg>
              Pagamento 100% Seguro
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Acesso Imediato por E-mail
            </span>
          </div>
        </div>

        {/* Risk-Free Guarantee Section */}
        <div className="w-full border border-slate-700/60 bg-slate-800/30 rounded-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 flex-shrink-0 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Garantia Incondicional de 7 Dias</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sem riscos para você! Use a planilha, faça o desafio e, se por qualquer motivo você achar que não vale a pena ou não se adaptar, basta solicitar o reembolso em até 7 dias após a compra. Devolvemos 100% do seu dinheiro sem burocracia.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
            Perguntas Frequentes (FAQ)
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-800 bg-slate-800/30 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white font-semibold hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-sm md:text-base">{faq.q}</span>
                  <span className={`text-xl transform transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-green-500' : 'text-slate-400'}`}>
                    ▼
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-48 border-t border-slate-800/80' : 'max-h-0'}`}
                >
                  <p className="px-6 py-4 text-sm text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer / Meta Policy Compliance */}
      <footer className="w-full border-t border-slate-800 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-2xl mx-auto space-y-4">
          <p>
            Este site não é afiliado ao Facebook ou a qualquer entidade da Meta Platforms, Inc. Uma vez que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
          <p>
            Fazemos todos os esforços para garantir que mostramos claramente todos os recursos do produto. Não vendemos o seu e-mail ou qualquer informação para terceiros.
          </p>
          <p className="text-slate-600 font-medium">
            © 2026 Planilha Financeira - Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
