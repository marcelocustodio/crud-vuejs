<template>
  <div class="single-usuario">
  	<div v-if="loaded">
	   	<h3>Dados do Usuário</h3>
	   	<div class="card">
	      <div class="card-header">
	        Usuário
	      </div>
	      <div class="card-body">
	      	<p >ID: {{usuarioId}}</p>
	        <p >Nome: {{usuarioNome}}</p>
	        <p >Idade: {{usuarioIdade}}</p>
	        
	        <router-link :to="'/'" class="btn btn-primary"> Voltar </router-link>
	      </div>
		</div>
    </div>
    <div v-else> 
    	<h3>Carregando usuário...</h3>
    </div>
  </div>
</template>

<script>
import db from '@/db'
export default {
  name: 'UsuarioPage',
  data () {
    return {
    	usuarioId:'',
    	usuarioNome: '',
    	usuarioIdade: '',
    	loaded: false
    }
  },
  beforeCreate (){
	  
	var docRef = db.collection('usuarios').doc(this.$route.params.id);
	docRef.get().then((doc)=> {
	    if (doc.exists) {
	        console.log("Document data:", doc.data().usuario_id);
	        this.usuarioId = doc.data().usuario_id
	        this.usuarioNome = doc.data().usuario_nome
	        this.usuarioIdade = doc.data().usuario_idade
	        this.loaded = true
	    } else {
	        console.log("Nao existe esse documento!");
	    }
	}).catch(function(error) {
	    console.log("Erro ao obter documento:", error);
	});

  }
}
</script>


<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

</style>
