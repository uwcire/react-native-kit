import { createSlice } from '@reduxjs/toolkit'
import themes from '@/theme/themes'
import { generatePersistConfig } from '@/utils/helper'
import { persistReducer } from 'redux-persist'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'default', darkMode: null } as ThemeState,
  reducers: {
    changeTheme: (state, { payload: { theme, darkMode } }: ThemePayload) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode } }: ThemePayload,
    ) => {
      if (!state.theme) {
        if (typeof theme !== 'undefined') {
          state.theme = theme
        }
        if (typeof darkMode !== 'undefined') {
          state.darkMode = darkMode
        }
      }
    },
  },
})

type DarkProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never
}[keyof T]

type PropsWithoutDark<T> = Omit<T, DarkProps<T>>

export type ThemeState = {
  theme: 'default' | keyof PropsWithoutDark<typeof themes>
  darkMode: boolean | null
}

type ThemePayload = {
  payload: Partial<ThemeState>
}

const persistConfig = generatePersistConfig('theme', ['theme'])

export const themeActions = themeSlice.actions

export default persistReducer<ThemeState>(persistConfig, themeSlice.reducer)
