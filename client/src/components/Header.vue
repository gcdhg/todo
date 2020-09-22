<template>
  <b-breadcrumb>
    <b-breadcrumb-item>
      <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
      <router-link to="/">Home</router-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item>
      <router-link to="/about">About</router-link>
    </b-breadcrumb-item>
    <b-breadcrumb-item>
      <router-link to="/create">Create</router-link>
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>