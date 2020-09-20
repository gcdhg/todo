<template>
  <b-breadcrumb>
    <b-breadcrumb-item href="#home">
      <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <router-link to="/">Home</router-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item href="/About"><router-link to="/about">About</router-link></b-breadcrumb-item>
  </b-breadcrumb>
</template>