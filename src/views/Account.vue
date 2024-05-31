<script setup lang="ts">
import { supabase } from '@/lib/supabase'
import { onMounted, ref, toRefs } from 'vue'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
  loadingController,
  IonInput,
  IonItem,
  IonButton,
  IonLabel
} from '@ionic/vue'
// import Avatar from '@/components/Avatar.vue'

const props = defineProps<{ session: any }>()
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username ?? ''
      website.value = data.website ?? ''
      avatar_url.value = data.avatar_url ?? ''
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    } else {
      console.error('An unexpected error occurred:', error)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="updateProfile">
        <ion-item>
          <ion-label>
            <p>Email</p>
            <p>{{ session?.user?.email }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input type="text" name="username" v-model="username"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Website</ion-label>
          <ion-input type="url" name="website" v-model="website"></ion-input>
        </ion-item>
        <div class="ion-text-center">
          <ion-button fill="clear" type="submit">Update Profile</ion-button>
        </div>
      </form>

      <div class="ion-text-center">
        <ion-button fill="clear" @click="signOut">Log Out</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>
