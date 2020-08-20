<template>
  <div @click="openSidebarMenu">
		<svg width="18" height="14" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z" fill="#5F5E5E"/>
		</svg>
	</div>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/compatibility/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [HamburgerIcon]
}
</script>
