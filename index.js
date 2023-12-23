// Data
const users = [
  {
    id: 1,
    name: "Florin Pop",
    img: "https://i.pinimg.com/564x/6f/10/4b/6f104bbe69b9053e193e7897f58df24e.jpg",
  },
  {
    id: 2,
    name: "Florin",
    img: "https://i.pinimg.com/736x/b3/a5/80/b3a58075f8e134d0583a9a8a9d7b94fd.jpg",
  },
  {
    id: 3,
    name: "Cristine",
    img: "https://i.pinimg.com/564x/ab/b1/91/abb19116225df43147cb674ae54911de.jpg",
  },
  {
    id: 4,
    name: "Stephine",
    img: "https://i.pinimg.com/564x/cb/80/3b/cb803b4c836280a231273e4a08ae6761.jpg",
  },
  {
    id: 5,
    name: "Eudora",
    img: "https://i.pinimg.com/564x/ef/9c/1c/ef9c1cdad2957b9d08e2678d82ead449.jpg",
  },
  {
    id: 6,
    name: "Nana",
    img: "https://i.pinimg.com/564x/3d/d8/bc/3dd8bcca1a6067fbcbd89c6fec4ea736.jpg",
  },
];

// Get Id User
const myUserId = 1;
let activeConversationId = undefined;

const conversations = [
  {
    id: 1,
    userId: 2,
    messages: [
      {
        userId: 2,
        message: "Hello World",
        time: new Date(),
      },
      {
        userId: 1,
        message: "Love ya!",
        time: new Date(),
      },
    ],
  },
  {
    id: 2,
    userId: 3,
    messages: [
      {
        userId: 2,
        message: "Hi",
        time: new Date(),
      },
      {
        userId: 3,
        message: "Ho",
        time: new Date(),
      },
    ],
  },
  {
    id: 3,
    userId: 4,
    messages: [
      {
        userId: 5,
        message: "Hello Dear",
        time: new Date(),
      },
      {
        userId: 4,
        message: "Ohh, Hello",
        time: new Date(),
      },
    ],
  },
  {
    id: 4,
    userId: 5,
    messages: [
      {
        userId: 6,
        message: "Hello ",
        time: new Date(),
      },
      {
        userId: 5,
        message: "Ohh, Hello",
        time: new Date(),
      },
    ],
  },
];

// DOM Setup
const coversationsWrapper = document.getElementById("conversations-wrapper");
const messagesWrapper = document.getElementById("messages-wrapper");
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

// Initial Load
conversations.forEach((conv) => {
  const convLi = document.createElement("li");
  convLi.className =
    "flex gap-4 cursor-pointer justify-between py-4 px-8 hover:bg-purple-800";

  const lastMessage = conv.messages[conv.messages.length - 1];
  const user = getUserById(conv.userId);

  convLi.addEventListener("click", () => {
    messagesWrapper.parentNode.classList.remove('hidden')
    loadMessages(conv.id);
    activeConversationId = conv.id
  });

  convLi.innerHTML = `
			<img class="w-20 h-20 object-cover rounded-full border-4 border-white" src="${
        user.img
      }" alt="${user.name}"/> 
				<div class="flex-1">
					<h3 class="text-2xl font-semibold">${user.name}</h3>
				<p>${lastMessage.message}</p>
				</div>
				<time class="text-purple-200 text-lg" datetime="${
          lastMessage.time
        }">${formateTime(lastMessage.time)}</time>`;
  coversationsWrapper.appendChild(convLi);
});


function getConversationById(conversationId) {
  return conversations.find(conv => conv.id === conversationId);
}

// Event Listener
messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = messageInput.value;
  const conversation = getConversationById(activeConversationId)

  if(message) {
    conversation.messages.push({
      userId: myUserId,
      message,
      time: new Date(),
    })

    messageInput.value = ''
  }

  loadMessages(activeConversationId)
})


function getUserById(id) {
  return users.find((user) => user.id === id);
}

function loadMessages(conversationId) {
	messagesWrapper.innerHTML = '';

  const { messages } = getConversationById(conversationId);

  messages.forEach(message => {
    const messLi = document.createElement("li");
    messLi.className = "flex gap-4 justify-between py-4 px-8 ";

    const user = getUserById(message.userId);

	if(user.id === myUserId) {
		messLi.classList.add('flex-row-reverse')
	}

    messLi.innerHTML = `
			<img
			class="w-20 h-20 object-cover rounded-full border-4 border-white"
			src="${user.img}"
			alt="${user.name}"
			/>
			<p class="bg-white shadow-sm w-full p-4 ">${message.message}</p>
		`;

    messagesWrapper.appendChild(messLi);
  });
}


function formateTime(date) {
  return new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);
}
