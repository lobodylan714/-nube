import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categorias = ["Todos", "Salgados", "Lanches", "Bebidas", "Doces"];

const produtos = [
  {
    id: 1,
    nome: "Coxinha de frango",
    descricao: "Coxinha crocante e saborosa",
    emoji: "🥟",
    categoria: "Salgados",
  },
  {
    id: 2,
    nome: "X-Burguer",
    descricao: "Hambúrguer com queijo",
    emoji: "🍔",
    categoria: "Lanches",
  },
  {
    id: 3,
    nome: "Suco natural",
    descricao: "Suco gelado de laranja",
    emoji: "🧃",
    categoria: "Bebidas",
  },
  {
    id: 4,
    nome: "Brigadeiro",
    descricao: "Brigadeiro tradicional",
    emoji: "🍫",
    categoria: "Doces",
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  const [carrinho, setCarrinho] = useState<Record<number, number>>({});

  const cardWidth = width > 900 ? "23%" : width > 600 ? "31%" : "47%";

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produto) => produto.categoria === categoriaSelecionada,
        );

  const quantidadeTotal = Object.values(carrinho).reduce(
    (total, quantidade) => total + quantidade,
    0,
  );

  function adicionarProduto(id: number) {
    setCarrinho((anterior) => ({
      ...anterior,
      [id]: (anterior[id] || 0) + 1,
    }));
  }

  function removerProduto(id: number) {
    setCarrinho((anterior) => {
      const novo = { ...anterior };
      const quantidade = novo[id] || 0;

      if (quantidade <= 1) {
        delete novo[id];
      } else {
        novo[id] = quantidade - 1;
      }

      return novo;
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🍔</Text>

            <View>
              <Text style={styles.logoTitle}>Cantina Digital</Text>

              <Text style={styles.logoSubtitle}>SUA CANTINA, MAIS FÁCIL!</Text>
            </View>
          </View>

          <View style={styles.status}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>Cantina aberta</Text>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.welcome}>BEM-VINDO À CANTINA!</Text>

            <Text style={styles.heroTitle}>
              Sua fome merece{"\n"}
              <Text style={styles.highlight}>um pedido especial.</Text>
            </Text>

            <Text style={styles.heroDescription}>
              Escolha seus produtos favoritos e faça seu pedido sem precisar
              enfrentar filas.
            </Text>

            <Pressable
              style={styles.orderButton}
              onPress={() => {
                // O cardápio fica disponível logo abaixo.
              }}
            >
              <Text style={styles.orderButtonText}>
                ESCOLHA SEUS PRODUTOS ↓
              </Text>
            </Pressable>
          </View>

          <View style={styles.heroEmojiContainer}>
            <Text style={styles.heroEmoji}>🍔</Text>
            <Text style={styles.heroEmojiSmall}>🍟 🥤</Text>
          </View>
        </View>

        {/* CARDÁPIO */}
        <View style={styles.menuHeader}>
          <View>
            <Text style={styles.sectionTitle}>Cardápio do dia</Text>

            <Text style={styles.sectionSubtitle}>
              Confira nossas opções de hoje!
            </Text>
          </View>

          <Text style={styles.menuIcon}>🍽️</Text>
        </View>

        {/* CATEGORIAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categorias.map((categoria) => {
            const selecionada = categoriaSelecionada === categoria;

            return (
              <Pressable
                key={categoria}
                onPress={() => setCategoriaSelecionada(categoria)}
                style={[styles.category, selecionada && styles.categoryActive]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selecionada && styles.categoryTextActive,
                  ]}
                >
                  {categoria}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* PRODUTOS */}
        <View style={styles.products}>
          {produtosFiltrados.map((produto) => (
            <View
              key={produto.id}
              style={[styles.productCard, { width: cardWidth }]}
            >
              <View style={styles.productImage}>
                <Text style={styles.productEmoji}>{produto.emoji}</Text>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productCategory}>
                  {produto.categoria.toUpperCase()}
                </Text>

                <Text style={styles.productName}>{produto.nome}</Text>

                <Text style={styles.productDescription}>
                  {produto.descricao}
                </Text>

                <View style={styles.productFooter}>
                  <View>
                    <Text style={styles.productPrice}>
                      Disponível gratuitamente
                    </Text>

                    {(carrinho[produto.id] || 0) > 0 && (
                      <Text style={styles.quantityText}>
                        No pedido: {carrinho[produto.id]}
                      </Text>
                    )}
                  </View>

                  <Pressable
                    style={styles.addButton}
                    onPress={() => adicionarProduto(produto.id)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* CARRINHO */}
        <View style={styles.cart}>
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>🛒 Seu pedido</Text>

            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{quantidadeTotal} itens</Text>
            </View>
          </View>

          {quantidadeTotal === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartEmoji}>🛍️</Text>

              <Text style={styles.emptyCartTitle}>Seu pedido está vazio</Text>

              <Text style={styles.emptyCartDescription}>
                Escolha seus produtos favoritos para começar!
              </Text>
            </View>
          ) : (
            produtos
              .filter((produto) => (carrinho[produto.id] || 0) > 0)
              .map((produto) => (
                <View key={produto.id} style={styles.cartItem}>
                  <Text style={styles.cartItemEmoji}>{produto.emoji}</Text>

                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{produto.nome}</Text>

                    <Text style={styles.cartItemPrice}>
                      {carrinho[produto.id]} unidade(s)
                    </Text>
                  </View>

                  <View style={styles.quantityControls}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => removerProduto(produto.id)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.quantityNumber}>
                      {carrinho[produto.id]}
                    </Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => adicionarProduto(produto.id)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              ))
          )}

          {/* TOTAL DE ITENS */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total de itens</Text>

            <Text style={styles.totalValue}>{quantidadeTotal}</Text>
          </View>

          {/* BOTÃO */}
          <Pressable
            style={[
              styles.checkoutButton,
              quantidadeTotal === 0 && styles.checkoutDisabled,
            ]}
            disabled={quantidadeTotal === 0}
            onPress={() => {
              // A finalização será desenvolvida na próxima etapa.
            }}
          >
            <Text style={styles.checkoutButtonText}>CONTINUAR PEDIDO →</Text>
          </Pressable>
        </View>

        {/* RODAPÉ */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Cantina Digital © 2026</Text>

          <Text style={styles.footerText}>Feito para facilitar seu dia ❤️</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    fontSize: 38,
  },

  logoTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#202938",
  },

  logoSubtitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#E87925",
    letterSpacing: 1,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5F7EC",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#20A45A",
    marginRight: 7,
  },

  statusText: {
    color: "#168447",
    fontSize: 12,
    fontWeight: "bold",
  },

  hero: {
    backgroundColor: "#253B32",
    borderRadius: 24,
    padding: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 270,
    overflow: "hidden",
    marginBottom: 35,
  },

  heroContent: {
    flex: 1,
  },

  welcome: {
    color: "#F8B65D",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 14,
  },

  heroTitle: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "900",
    lineHeight: 39,
  },

  highlight: {
    color: "#F8B65D",
  },

  heroDescription: {
    color: "#E2E9E4",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 390,
  },

  orderButton: {
    backgroundColor: "#F29B38",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 22,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  heroEmojiContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  heroEmoji: {
    fontSize: 100,
  },

  heroEmojiSmall: {
    fontSize: 28,
    marginTop: -5,
  },

  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: "#202938",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#89919C",
    marginTop: 5,
  },

  menuIcon: {
    fontSize: 30,
  },

  categories: {
    gap: 10,
    marginBottom: 20,
  },

  category: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E9EBEF",
  },

  categoryActive: {
    backgroundColor: "#253B32",
    borderColor: "#253B32",
  },

  categoryText: {
    color: "#5C6673",
    fontWeight: "bold",
    fontSize: 12,
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 14,
  },

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ECEEF1",
  },

  productImage: {
    backgroundColor: "#F1F3ED",
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },

  productEmoji: {
    fontSize: 65,
  },

  productInfo: {
    padding: 13,
  },

  productCategory: {
    fontSize: 9,
    color: "#E58B2E",
    fontWeight: "900",
    letterSpacing: 1,
  },

  productName: {
    fontSize: 15,
    fontWeight: "900",
    color: "#253040",
    marginTop: 6,
  },

  productDescription: {
    color: "#89919C",
    fontSize: 11,
    marginTop: 5,
    minHeight: 28,
  },

  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  productPrice: {
    color: "#253B32",
    fontSize: 13,
    fontWeight: "900",
  },

  quantityText: {
    color: "#168447",
    fontSize: 10,
    marginTop: 3,
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#F29B38",
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },

  cart: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 35,
    borderWidth: 1,
    borderColor: "#ECEEF1",
  },

  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  cartTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#253040",
  },

  cartBadge: {
    backgroundColor: "#E5F7EC",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  cartBadgeText: {
    color: "#168447",
    fontSize: 12,
    fontWeight: "bold",
  },

  emptyCart: {
    alignItems: "center",
    paddingVertical: 25,
  },

  emptyCartEmoji: {
    fontSize: 42,
  },

  emptyCartTitle: {
    color: "#253040",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },

  emptyCartDescription: {
    color: "#89919C",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF1",
    gap: 12,
  },

  cartItemEmoji: {
    fontSize: 30,
  },

  cartItemInfo: {
    flex: 1,
  },

  cartItemName: {
    fontWeight: "bold",
    color: "#253040",
    fontSize: 14,
  },

  cartItemPrice: {
    color: "#168447",
    fontWeight: "bold",
    marginTop: 4,
  },

  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#F1F3F5",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#253040",
  },

  quantityNumber: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#253040",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ECEEF1",
  },

  totalLabel: {
    color: "#253040",
    fontWeight: "bold",
    fontSize: 15,
  },

  totalValue: {
    color: "#168447",
    fontWeight: "900",
    fontSize: 23,
  },

  checkoutButton: {
    backgroundColor: "#253B32",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  checkoutDisabled: {
    backgroundColor: "#A8B0AA",
  },

  checkoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E7E9EC",
    marginTop: 35,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },

  footerText: {
    color: "#9AA1AA",
    fontSize: 11,
  },
});
