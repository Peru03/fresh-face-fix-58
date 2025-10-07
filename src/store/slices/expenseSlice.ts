import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  hasReceipt: boolean;
  receiptUrl?: string;
  aiCategorized?: boolean;
}

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: ExpenseState = {
  expenses: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Async thunks
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (params: { page?: number; category?: string; search?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/expenses', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch expenses');
    }
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expenseData: Partial<Expense>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/expenses', expenseData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add expense');
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, data }: { id: string; data: Partial<Expense> }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/expenses/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update expense');
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/expenses/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete expense');
    }
  }
);

export const uploadReceipt = createAsyncThunk(
  'expenses/uploadReceipt',
  async ({ expenseId, file }: { expenseId: string; file: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('receipt', file);
      const response = await axios.post(`/expenses/${expenseId}/receipt`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload receipt');
    }
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch expenses
    builder.addCase(fetchExpenses.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.expenses = action.payload.expenses;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add expense
    builder.addCase(addExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload);
    });

    // Update expense
    builder.addCase(updateExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    });

    // Delete expense
    builder.addCase(deleteExpense.fulfilled, (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    });

    // Upload receipt
    builder.addCase(uploadReceipt.fulfilled, (state, action: PayloadAction<any>) => {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    });
  },
});

export const { clearError } = expenseSlice.actions;
export default expenseSlice.reducer;
