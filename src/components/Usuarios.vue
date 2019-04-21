<template>
  <div class="usuarios">
    <h3>Usuários</h3>
    <div class="card">
      <div class="card-header">
        Cadastrar novo usuário
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>ID</label>
            <input v-model="usuarioData.usuario_id" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Nome</label>
            <input v-model="usuarioData.usuario_nome" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Idade</label>
            <input v-model="usuarioData.usuario_idade" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Cadastrar</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Lista de Usuários
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  ID
                </th>
                <th>
                  Nome
                </th>
                <th>
                  Idade
                </th>
                <th>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in sortedUsuarios" v-bind:key="usuario.id">
                <template v-if="editId == usuario.id">
                  <td><input v-model="editusuarioData.usuario_id" type="text"></td>
                  <td><input v-model="editusuarioData.usuario_nome" type="text"></td>
                  <td><input v-model="editusuarioData.usuario_idade" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(usuario.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{usuario.usuario_id}}
                  </td>
                  <td>
                    {{usuario.usuario_nome}}
                  </td>
                  <td>
                    {{usuario.usuario_idade}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(usuario.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(usuario)" class="fa fa-pencil"></i>
                    </a>
                    <router-link 
                    :to="{
                      name:'UsuarioPage', 
                      params:{id: usuario.id}
                    }" 
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import db from '@/db'
export default {
  name: 'Usuarios',
  data () {
    return {
      editId: '',
      usuarioData: {
        'id' : '',
        'usuario_id': '',
        'usuario_nome': '',
        'usuario_idade': ''
      },
      editusuarioData: {
        'id' : '',
        'usuario_id': '',
        'usuario_nome': '',
        'usuario_idade': ''
      },
      usuarios: []
    }
  },
  created() {
    this.getUsuarios()
  },
  computed:{
    sortedUsuarios(){
      return this.usuarios.slice().sort((a,b)=>{
        return a.usuario_id - b.usuario_id
      })
    }
  },
  methods: {
    getUsuarios() {
      db.collection('usuarios').get().then(querySnapshot =>{
        const usuarios = []
        
        const usuariosArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          usuariosArray.push(doc.data())
          usuariosArray[i].id = doc.id
          usuarios.push(usuariosArray[i])
          i++
        })
        
        this.usuarios = usuarios
      })
    },
    onSubmit(){
      db.collection('usuarios').add(this.usuarioData).then(this.getUsuarios)
      this.usuarioData.usuario_id = ''
      this.usuarioData.usuario_nome = ''
      this.usuarioData.usuario_idade = ''

    },
    
    onDelete(id){
      db.collection('usuarios').doc(id).delete().then((data)=> {
          this.getUsuarios()
      })
    },
    onEdit(usuario){
      this.editId = usuario.id
      this.editusuarioData.usuario_id = usuario.usuario_id
      this.editusuarioData.usuario_nome = usuario.usuario_nome
      this.editusuarioData.usuario_idade = usuario.usuario_idade
    },
    onCancel(){
      this.editId = ''
      this.editusuarioData.usuario_id = ''
      this.editusuarioData.usuario_nome = ''
      this.editusuarioData.usuario_idade = ''
    },
    onEditSubmit (id){
      db.collection("usuarios").doc(id).set(this.editusuarioData).then(
        this.getUsuarios)
        this.editId = ''
        this.editusuarioData.usuario_id = ''
        this.editusuarioData.usuario_nome = ''
        this.editusuarioData.usuario_idade = ''
    }
  }
}
</script>

<!-- limitando o CSS a esse componente -->
<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}
</style>
