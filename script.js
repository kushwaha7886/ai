const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');
const refreshButton = document.querySelector('.refresh-button');
const themeToggle = document.getElementById('themeToggle');

function createMessage(role, text) {
  const row = document.createElement('div');
  row.className = role === 'user' ? 'message-row user-row' : 'message-row assistant-row';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = role === 'user' ? 'Y' : 'N';

  const bubble = document.createElement('div');
  bubble.className = role === 'user' ? 'message-bubble user-bubble' : 'message-bubble assistant-bubble';

  const label = document.createElement('div');
  label.className = 'message-label';
  label.textContent = role === 'user' ? 'You' : 'Nova AI';

  const messageText = document.createElement('div');
  messageText.className = 'message-text';
  messageText.textContent = text;

  bubble.appendChild(label);
  bubble.appendChild(messageText);

  row.appendChild(avatar);
  row.appendChild(bubble);

  return row;
}

function getBotResponse(input) {
  const text = input.trim().toLowerCase();

  if (!text) {
    return 'I am ready when you are.';
  }

  const rules = [
    {
      category: 'greeting',
      patterns: /\b(hi|hello|hey|good morning|good evening|good day)\b/,
      response: 'Hello! I am Nova AI. Tell me what you want to build, learn, or improve today.'
    },
    {
      category: 'identity',
      patterns: /\b(who are you|what are you|what is your name|your name)\b/,
      response: 'I am Nova AI, a local assistant for planning, building, and improving ideas.'
    },
    {
      category: 'ai-definition',
      patterns: /\b(what is ai|what is artificial intelligence|ai meaning|artificial intelligence)\b/,
      response: 'AI means using software to recognize patterns, process language, and help with decisions based on data.'
    },
    {
      category: 'strategy',
      patterns: /\b(strategy|plan|launch|roadmap|goal|milestone|next step)\b/,
      response: 'A strong plan starts with a clear user need, one measurable goal, and a short weekly milestone plan.'
    },
    {
      category: 'user-problem',
      patterns: /\b(problem|issue|question|challenge|difficulty|need help)\b/,
      response: 'Let’s define the user problem clearly, then pick the smallest helpful feature that can be tested quickly.'
    },
    {
      category: 'build',
      patterns: /\b(build|create|make|project|website|app|prototype|product)\b/,
      response: 'Let’s define the user problem, choose the smallest useful feature, then improve it with feedback and real usage data.'
    },
    {
      category: 'business',
      patterns: /\b(business|growth|market|customer|audience|users|sales)\b/,
      response: 'Focus on one audience, one clear value promise, and one repeatable customer feedback loop.'
    },
    {
      category: 'ai-workflow',
      patterns: /\b(ai|automate|workflow|machine learning|software|data|logic)\b/,
      response: 'AI works best when it removes repetitive work, supports decisions, and creates useful feedback loops.'
    },
    {
      category: 'learn',
      patterns: /\b(how|why|when|where|what)\b/,
      response: 'Start by naming the user, the problem, and the result you want to measure. Then choose the smallest action that creates learning.'
    }
  ];

  const matched = rules.find((rule) => rule.patterns.test(text));

  if (matched) {
    return matched.response;
  }

  return 'That is a useful direction. I would break it into a goal, a target user, a clear deliverable, and a short plan for testing.';
}

chatForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = chatInput.value.trim();
  if (!text) return;

  chatMessages.appendChild(createMessage('user', text));
  chatMessages.scrollTop = chatMessages.scrollHeight;

  chatInput.value = '';

  sendButton.disabled = true;
  sendButton.style.opacity = '0.8';

  window.setTimeout(() => {
    const response = getBotResponse(text);
    chatMessages.appendChild(createMessage('assistant', response));
    chatMessages.scrollTop = chatMessages.scrollHeight;
    sendButton.disabled = false;
    sendButton.style.opacity = '1';
  }, 400);
});

refreshButton.addEventListener('click', function () {
  chatMessages.innerHTML = '';
  chatMessages.appendChild(createMessage('assistant', 'Fresh session is ready. What would you like to explore?'));
});

themeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark');
});

chatInput.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 110) + 'px';
});
