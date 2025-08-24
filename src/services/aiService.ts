// Enhanced AI services for image analysis and insights
import { ChatMessage } from './chatService';

export interface ImageAnalysisResult {
    success: boolean;
    analysis: string;
    metadata?: {
        imageProcessed: boolean;
        analysisLength: number;
        timestamp: string;
    };
}

export interface AIInsights {
    userInterests: string[];
    recommendedProjects: string[];
    conversationSummary: string;
    nextSteps: string[];
    technicalLevel: 'beginner' | 'intermediate' | 'advanced';
    topicsDiscussed: string[];
}

export interface ProjectRecommendation {
    title: string;
    reason: string;
    relevanceScore: number;
    highlights: string[];
}

export interface RecommendationsResult {
    success: boolean;
    recommendations: {
        recommendedProjects: ProjectRecommendation[];
        learningPath: string[];
        nextQuestions: string[];
    };
    metadata?: {
        generatedAt: string;
        basedOn: number;
    };
}

export interface InsightsResult {
    success: boolean;
    insights: AIInsights;
    metadata?: {
        analysisGenerated: boolean;
        timestamp: string;
        conversationLength: number;
    };
}

// Analyze uploaded images with AI
export async function analyzeImage(
    imageUrl?: string, 
    imageBase64?: string, 
    prompt?: string
): Promise<ImageAnalysisResult> {
    try {
        const response = await fetch('/api/analyze-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageUrl,
                imageBase64,
                prompt: prompt || "Beschreibe und analysiere dieses Bild im Kontext eines Tech-Portfolios."
            })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Image analysis error:', error);
        return {
            success: false,
            analysis: 'Fehler bei der Bildanalyse'
        };
    }
}

// Get AI-powered insights about user conversation
export async function getAIInsights(conversationHistory: ChatMessage[]): Promise<InsightsResult> {
    try {
        const response = await fetch('/api/ai-insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                conversationHistory
            })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('AI insights error:', error);
        return {
            success: false,
            insights: {
                userInterests: ['AI', 'Machine Learning'],
                recommendedProjects: ['Kreditkartenbetrug-Erkennung'],
                conversationSummary: 'Analyse nicht verfügbar',
                nextSteps: ['Mehr über Projekte erfahren'],
                technicalLevel: 'intermediate',
                topicsDiscussed: ['Portfolio']
            }
        };
    }
}

// Convert image file to base64 for AI analysis
export function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // Remove data:image/...;base64, prefix to get just the base64 data
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Get AI-powered project recommendations
export async function getProjectRecommendations(
    userInterests: string[],
    conversationContext?: string,
    technicalLevel?: string
): Promise<RecommendationsResult> {
    try {
        const response = await fetch('/api/ai-recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userInterests,
                conversationContext,
                technicalLevel
            })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Project recommendations error:', error);
        return {
            success: false,
            recommendations: {
                recommendedProjects: [
                    {
                        title: "AI Chatbot Portfolio",
                        reason: "Interaktives Portfolio mit Azure OpenAI",
                        relevanceScore: 90,
                        highlights: ["Conversational AI", "TypeScript", "Modern UI"]
                    }
                ],
                learningPath: ["Erkunde die Projektdetails"],
                nextQuestions: ["Wie funktioniert die AI-Integration?"]
            }
        };
    }
}