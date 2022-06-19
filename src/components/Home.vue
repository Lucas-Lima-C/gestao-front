<template>
  <div>
  <div class="card content-crud" style="margin-top:16px; padding:10px">
    <div class="ibox animated fadeInRightBig" v-if="!$route.params.operation">
      <div class="ibox-title" style="padding-left: 5px">
      <h3>
        Home
      </h3>
      </div>
    <hr/>
    <!-- Indicadores -->
    <div class="row">
      <div class="col-md-3">
        <div class="card pastel-blue">
          <div class="card-body position-relative overflow-hidden">
            <div class="card-small-info">Usuários</div>
            <div class="card-value-info">2</div>
            <i class="fas fa-users card-icon"></i>
          </div>
        </div>
      </div>
    </div>
    <hr/>

    <div class="row">
      <div class="col-md-3">
        <div class="card pastel-yellow">
          <div class="card-body position-relative overflow-hidden">
            <div class="card-small-info">Tarefas Pendentes</div>
            <div class="card-value-info">5</div>
            <i class="fas fa-calendar card-icon"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card pastel-green">
          <div class="card-body position-relative overflow-hidden">
            <div class="card-small-info">Tarefas Concluídas</div>
            <div class="card-value-info">7</div>
            <i class="fas fa-check card-icon"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card pastel-red">
          <div class="card-body position-relative overflow-hidden">
            <div class="card-small-info">Tarefas Atrasadas</div>
            <div class="card-value-info">4</div>
            <i class="fas fa-clock card-icon"></i>
          </div>
        </div>
      </div>

    </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
<style>
.line{
width: 100%;
color: grey;
height: 47px;
border-bottom: 1px solid lightblue;
position: absolute;
}
</style>
