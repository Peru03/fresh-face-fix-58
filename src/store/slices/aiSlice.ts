import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIInsight {
  id: string;
  type: 'saving' | 'warning' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  impact: number;
  createdAt: Date;
}

interface AIState {
  chatMessages: ChatMessage[];
  insights: AIInsight[];
  isProcessing: boolean;
  error: string | null;
}

const initialState: AIState = {
  chatMessages: [],
  insights: [],
  isProcessing: false,
  error: null,
};

// Async thunks
export const sendChatMessage = createAsyncThunk(
  'ai/sendChatMessage',
  async (message: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('/ai/chat', { message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const fetchAIInsights = createAsyncThunk(
  'ai/fetchInsights',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/ai/insights');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch insights');
    }
  }
);

export const analyzeReceipt = createAsyncThunk(
  'ai/analyzeReceipt',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('receipt', file);
      const response = await axios.post('/ai/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to analyze receipt');
    }
  }
);

export const predictExpenses = createAsyncThunk(
  'ai/predictExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/ai/predict-expenses');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to predict expenses');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.chatMessages.push({
        id: Date.now().toString(),
        role: 'user',
        content: action.payload,
        timestamp: new Date(),
      });
    },
    clearError: (state) => {
      state.error = null;
    },
    clearChat: (state) => {
      state.chatMessages = [];
    },
  },
  extraReducers: (builder) => {
    // Send chat message
    builder.addCase(sendChatMessage.pending, (state) => {
      state.isProcessing = true;
      state.error = null;
    });
    builder.addCase(sendChatMessage.fulfilled, (state, action: PayloadAction<any>) => {
      state.isProcessing = false;
      state.chatMessages.push({
        id: Date.now().toString(),
        role: 'assistant',
        content: action.payload.response,
        timestamp: new Date(),
      });
    });
    builder.addCase(sendChatMessage.rejected, (state, action) => {
      state.isProcessing = false;
      state.error = action.payload as string;
    });

    // Fetch AI insights
    builder.addCase(fetchAIInsights.fulfilled, (state, action: PayloadAction<AIInsight[]>) => {
      state.insights = action.payload;
    });
  },
});

export const { addUserMessage, clearError, clearChat } = aiSlice.actions;
export default aiSlice.reducer;
