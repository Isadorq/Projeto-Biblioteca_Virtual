<template>
  <div iv="app">
  <!-- Formulário para adicionar ou editar um livro-->
    <BookForm :bookToEdit="bookToEdit" @book-added="fetchBooks" @book-updated="fetchBooks"/>
  <!-- Lista de livros -->
  <BookForm @edit-book="setBookToEdit" ref="bookList" />
  <BookList/>
  </div>
</template>

<script>
  import BookList from './components/BookList.vue';
  import BookForm from './components/BookForm.vue';

  export default {
   data(){
     return {
       bookToEdit: null, // Inicializa o estado do lvro a ser editado
     };
    },
    components: {
      BookList,
      BookForm,
    },
    methods: {
      // Função para definir o livro que será editado
      setBookToEdit(book) {
        this.bookToEdit = book;
      },
      // Função para atualizar a lista de livros após adicionar ou editar fetchBooks() 
      fetchBooks() {
        this.$refs.bookList.fetchBooks(),
        this.bookToEdit = null // Limpa o formulário após a ação
      },
    },
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
