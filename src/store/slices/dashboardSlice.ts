import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

interface DashboardStats {
  totalSpent: number;
  totalTransactions: number;
  budgetRemaining: number;
  avgTransaction: number;
  monthlyChange: {
    spent: number;
    transactions: number;
    budget: number;
    avg: number;
  };
}

interface CategoryBreakdown {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface RecentExpense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface DashboardState {
  stats: DashboardStats | null;
  categoryBreakdown: CategoryBreakdown[];
  recentExpenses: RecentExpense[];
  spendingTrend: { month: string; amount: number }[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  categoryBreakdown: [],
  recentExpenses: [],
  spendingTrend: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/dashboard');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchSpendingTrend = createAsyncThunk(
  'dashboard/fetchSpendingTrend',
  async (months: number = 6, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/dashboard/trend?months=${months}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch spending trend');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch dashboard data
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.stats = action.payload.stats;
      state.categoryBreakdown = action.payload.categoryBreakdown;
      state.recentExpenses = action.payload.recentExpenses;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch spending trend
    builder.addCase(fetchSpendingTrend.fulfilled, (state, action: PayloadAction<any>) => {
      state.spendingTrend = action.payload;
    });
  },
});

export const { clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
