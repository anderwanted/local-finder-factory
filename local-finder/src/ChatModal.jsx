import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User, Phone } from 'lucide-react';
import { supabase } from './supabaseClient'; 

// Recebendo 'projeto' via props
export default function ChatModal({ local, projeto, onClose }) {
  const [step, setStep] = useState(0); 
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [leadData, setLeadData] = useState({ nome: '', telefone: '' });
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => {
        addBotMessage(`Olá! Sou o assistente virtual da ${local.nome}. 🐶`);
        setTimeout(() => {
          addBotMessage("Como podemos te ajudar hoje?");
          setStep(1); 
        }, 1000);
      }, 500);
    }
  }, [step, local.nome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, step]);

  const addBotMessage = (text) => setMessages(prev => [...prev, { sender: 'bot', text }]);
  const addUserMessage = (text) => setMessages(prev => [...prev, { sender: 'user', text }]);

  const handleFirstInteraction = () => {
    if (!userInput.trim()) return;
    addUserMessage(userInput);
    setUserInput(''); 
    setTimeout(() => {
      addBotMessage("Perfeito! Vou transferir para um atendente humano.");
      setTimeout(() => {
        addBotMessage("Para isso, preciso só do seu Nome e WhatsApp.");
        setStep(2); 
      }, 1000);
    }, 800);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.nome || !leadData.telefone) return alert("Preencha os dados!");
    
    setIsSending(true);

    const { error } = await supabase.from('leads').insert({
      nome: leadData.nome,
      telefone: leadData.telefone,
      loja_alvo: local.nome,
      mensagem_inicial: messages.find(m => m.sender === 'user')?.text || 'Interesse geral',
      projeto_id: projeto.id // 🔒 AQUI ESTÁ O SEGREDO
    });

    if (error) {
      console.error("Erro Supabase:", error);
      alert("Erro ao salvar lead!");
      setIsSending(false);
      return; 
    }

    addBotMessage("Tudo certo! Abrindo o WhatsApp...");
    
    setTimeout(() => {
      const storePhone = local.telefone; 
      const text = encodeURIComponent(
        `Olá! Me chamo *${leadData.nome}*. Vim pelo ${projeto.nome} e gostaria de saber sobre: ${messages.find(m => m.sender === 'user')?.text}`
      );
      window.open(`https://wa.me/${storePhone}?text=${text}`, '_blank');
      onClose(); 
    }, 1500);
  };

  // Usamos as cores do projeto aqui também
  const corBtn = projeto?.cor_primaria || '#075e54';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', zIndex: 9999,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
    }}>
      <div style={{
        width: '100%', maxWidth: '500px', height: '85vh',
        background: '#e5ddd5', 
        display: 'flex', flexDirection: 'column',
        borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
        overflow: 'hidden', boxShadow: '0 -4px 20px rgba(0,0,0,0.2)'
      }}>
        
        <div style={{ padding: '15px', background: corBtn, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
             <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems:'center', justifyContent:'center', color: corBtn, fontWeight:'bold'}}>
               {local.nome.substring(0,2).toUpperCase()}
             </div>
             <div>
               <div style={{fontWeight: 'bold', fontSize: '16px'}}>{local.nome}</div>
               <div style={{fontSize: '12px', opacity: 0.9}}>Online agora</div>
             </div>
          </div>
          <button onClick={onClose} style={{background:'none', border:'none', color:'white', cursor:'pointer'}}><X size={24} /></button>
        </div>

        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
              background: msg.sender === 'bot' ? 'white' : '#dcf8c6',
              padding: '12px 16px', borderRadius: '8px', maxWidth: '85%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)', fontSize: '15px', lineHeight: '1.4'
            }}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ background: '#f0f0f0', padding: '10px' }}>
          {step === 1 && (
            <div style={{ display: 'flex', gap: '10px', padding: '5px' }}>
              <input 
                type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFirstInteraction()}
                placeholder="Digite sua dúvida..." autoFocus
                style={{ flex: 1, padding: '12px', borderRadius: '25px', border: '1px solid #ccc', outline: 'none' }}
              />
              <button onClick={handleFirstInteraction} style={{ background: corBtn, color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', background: 'white', borderRadius: '15px' }}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid #eee', padding:'5px'}}>
                <User size={18} color="#666"/>
                <input required placeholder="Seu Nome" value={leadData.nome} onChange={e => setLeadData({...leadData, nome: e.target.value})} style={{border:'none', outline:'none', width:'100%', padding:'8px'}} />
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid #eee', padding:'5px'}}>
                <Phone size={18} color="#666"/>
                <input required type="tel" placeholder="Seu WhatsApp (com DDD)" value={leadData.telefone} onChange={e => setLeadData({...leadData, telefone: e.target.value})} style={{border:'none', outline:'none', width:'100%', padding:'8px'}} />
              </div>
              
              <button type="submit" disabled={isSending} style={{ marginTop: '5px', background: '#25D366', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                {isSending ? 'Conectando...' : 'Iniciar Conversa no WhatsApp ➤'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}