# 🌐 AI-Enhanced Portfolio

An interactive portfolio built with Next.js 15.4.6, showcasing AI, ML, and software engineering projects.
The portfolio includes an **advanced AI assistant** powered by Azure OpenAI GPT-3.5 with multiple AI capabilities.

## 🚀 Enhanced AI Features

### 🤖 **Multi-Modal AI Assistant**
- **Conversational Memory**: Context-aware conversations with chat history retention
- **Smart Question Suggestions**: AI-generated contextual follow-up questions
- **Image Analysis**: Upload images for AI-powered analysis and insights
- **Project Recommendations**: AI suggests relevant projects based on user interests
- **Conversation Analytics**: Real-time insights about user engagement and technical level

### 🎯 **AI-Powered Interactions**
- **Enhanced Prompts**: Sophisticated German system prompts for better responses
- **Context Understanding**: AI remembers conversation flow and user preferences
- **Technical Level Detection**: Adapts responses based on user's technical expertise
- **Interest Tracking**: Builds user profile for personalized recommendations

### 📸 **Image Intelligence**
- **Visual Analysis**: AI describes and analyzes uploaded images
- **Tech Context**: Relates images to portfolio and technical projects
- **Multi-format Support**: Handles various image formats via base64 encoding

### 💡 **Smart Recommendations**
- **Project Matching**: AI recommends relevant portfolio projects
- **Learning Paths**: Suggests next steps based on interests
- **Dynamic Content**: Contextual suggestions that evolve with conversation

## 🛠️ Tech Stack

- **Frontend:** Next.js 15.4.6, TypeScript, Chakra UI, Framer Motion
- **AI/ML:** Azure OpenAI GPT-3.5, Vision API, Custom AI Services
- **Backend:** Next.js API Routes, Advanced AI Endpoints
- **Deployment:** Vercel-ready with optimized build

## 🔧 API Endpoints

### Enhanced AI APIs
- `/api/chat` - Enhanced chat with memory and context
- `/api/analyze-image` - AI-powered image analysis
- `/api/ai-insights` - Conversation analytics and insights  
- `/api/ai-recommendations` - Smart project recommendations
- `/api/upload-image` - File upload handling

## 🔑 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/quocvietphung/my-ai-portfolio.git
   cd my-ai-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   AZURE_OPENAI_API_KEY=your_api_key
   AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
   AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
   AZURE_OPENAI_API_VERSION=2024-02-15-preview
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```
   Visit: [http://localhost:3000](http://localhost:3000)

## 🎨 AI Features in Action

### Smart Conversations
- **Memory**: "Remember what we discussed about machine learning?"
- **Context**: AI recalls previous topics and builds on them
- **Suggestions**: Contextual question recommendations appear automatically

### Image Analysis
- **Upload**: Click the purple image icon to upload photos
- **Analysis**: AI provides detailed technical analysis
- **Context**: Relates images to portfolio projects and skills

### Project Discovery
- **Recommendations**: AI suggests projects based on your interests
- **Relevance Scoring**: Projects ranked by relevance to your queries
- **Deep Dive**: Get detailed explanations of implementation approaches

## 📱 User Experience

### Interactive Elements
- **Section Navigation**: Quick access to portfolio sections
- **Smart Questions**: One-click interesting conversation starters
- **Project Buttons**: Direct access to recommended projects
- **Visual Feedback**: Real-time AI analysis and insights

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Touch-Friendly**: Large buttons and intuitive gestures
- **Fast Loading**: Optimized builds and efficient AI calls

## 🎯 Use Cases

### For Visitors
- **Explore Projects**: Interactive discovery of AI/ML work
- **Ask Questions**: Natural conversation about technical topics
- **Visual Analysis**: Upload screenshots or diagrams for AI insights
- **Learn**: Get explanations tailored to your technical level

### For Developers
- **Code Architecture**: Modern Next.js with TypeScript
- **AI Integration**: Real-world Azure OpenAI implementation
- **API Design**: RESTful endpoints with proper error handling
- **State Management**: React hooks with complex AI state

## 📊 AI Analytics

The portfolio tracks and analyzes:
- **User Interests**: Topics that engage visitors most
- **Technical Level**: Beginner, intermediate, or advanced
- **Conversation Flow**: Popular question patterns
- **Project Engagement**: Which projects generate most interest

## 🎓 Learning Opportunities

This portfolio demonstrates:
- **Modern React Patterns**: Hooks, context, and state management
- **AI Integration**: Practical Azure OpenAI implementation
- **TypeScript Excellence**: Full type safety with complex interfaces
- **API Architecture**: RESTful design with AI-enhanced endpoints
- **User Experience**: Intuitive AI-human interaction design

## 📸 Screenshots

### AI Chat Interface
![AI Enhanced Chat](public/demo/ai-enhanced-chat.png)

### Image Analysis Feature  
![Image Analysis](public/demo/image-analysis.png)

### Project Recommendations
![Smart Recommendations](public/demo/project-recommendations.png)

## 🚀 Future Enhancements

- **Voice Integration**: Speech-to-text and text-to-speech
- **Real-time Collaboration**: Multi-user AI sessions
- **Advanced Analytics**: Detailed visitor insights dashboard
- **More AI Models**: Integration with additional AI services
- **Custom Training**: Fine-tuned models for specific use cases

## 📜 License

MIT License. Feel free to use and adapt this AI-enhanced portfolio.

---

**Built with ❤️ and 🤖 AI by Viet Phung**

*Experience the future of interactive portfolios with advanced AI capabilities!*
