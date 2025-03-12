"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Định nghĩa kiểu sản phẩm trong giỏ hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl:string,
  // Có thể mở rộng thêm các thuộc tính khác nếu cần (ví dụ: imageUrl, description, ...)
}

// Định nghĩa kiểu dữ liệu trong context
export interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Partial<CartItem> & { id: string; name: string; price: number }
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// Tạo Context với kiểu dữ liệu rõ ràng
const CartContext = createContext<CartContextType | undefined>(undefined);

// Định nghĩa props cho CartProvider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const parsed = JSON.parse(storedCart);
          // Đảm bảo mỗi item có quantity (nếu không có, mặc định là 1)
          return Array.isArray(parsed)
            ? parsed.map((item: any) => ({
                ...item,
                quantity: item.quantity || 1,
              }))
            : [];
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
    return [];
  });

  // Cập nhật localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Hàm thêm vào giỏ hàng
  const addToCart = (
    product: Partial<CartItem> & { id: string; name: string; price: number }
  ) => {
    setCart((prevCart) => {
      // Tạo đối tượng mới với quantity mặc định là 1 nếu chưa có
      const newProduct: CartItem = {
        ...product,
        quantity: product.quantity ?? 1,
      } as CartItem;
      const existingItem = prevCart.find(
        (item) => item.id === newProduct.id
      );
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, merge toàn bộ data mới và cộng dồn số lượng
        return prevCart.map((item) =>
          item.id === newProduct.id
            ? { ...newProduct, quantity: item.quantity + newProduct.quantity }
            : item
        );
      } else {
        // Nếu chưa tồn tại, thêm sản phẩm mới
        return [...prevCart, newProduct];
      }
    });
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart([]);
  };

  // Memo hóa giá trị context để tránh render lại không cần thiết
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cart]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

// Hook dùng giỏ hàng, đảm bảo context luôn được sử dụng trong CartProvider
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart phải được dùng trong CartProvider");
  }
  return context;
};
