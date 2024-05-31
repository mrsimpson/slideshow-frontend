<template>
  <ion-app>
    <ion-page>
      <ion-router-outlet />
      <!--      <Account v-if="session" :session="session" />-->
      <!--      <Login v-else />-->
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/vue'
import { onMounted, ref } from 'vue'

import { supabase } from '@/lib/supabase'
import Login from '@/views/Login.vue'
import Account from '@/views/Account.vue'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<router-view :session="session" />
