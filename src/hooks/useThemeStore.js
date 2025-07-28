import {create} from "zustand"

export const useThemeStore = create((set)=>({
    theme:localStorage.getItem("ShopNest-theme") ||"light",
    setTheme:(theme)=>{
        localStorage.setItem("ShopNest-theme", theme)
        set({theme})}
}))
