<template>
  <div class="phone-tooltip">
		<span class="phone-tooltip-title">{{ $t('Consultation by telephone') }}</span>
		<template v-for="(phone, index) in phoneNumbers">
		  <a :key="index" class="phone-tooltip-number" :href="`tel:${phone}`">{{ phone }}</a>
		</template>
		<span class="phone-tooltip-date">{{  $t('work_time')  }}</span>
		<span class="phone-tooltip-description">{{ $t('Calls according to the tariffs of your operator') }}</span>
	</div>
</template>

<script>
import config from 'config'
export default {
	data: () => ({
		phoneNumbers: config.phoneNumbers
	})
}
</script>

<style lang="scss" scoped>
.phone-tooltip {
	z-index: 1;
  
	&-title {
		font-size: 18px;
		line-height: 20px;
		font-weight: 600;
		color: #1A1919;
		margin-bottom: 16px;
	}
	&-number {
		width: fit-content;
		color: #23BE20!important;
		font-size: 15px;
		margin-bottom: 16px;
		text-decoration: none;
		font-weight: 600;

		&:after {
			content: none;
		}
	}

	&-date {
		font-size: 14px;
		color: #595858;
		margin-bottom: 12px;
	}

	&-description {
		font-family: DIN Pro;
		font-size: 14px;
		line-height: 16px;
		color: rgba(95, 94, 94, 0.6);
	}
}

a.underline:after, a:not(.no-underline):hover:after {
  content: none;
}
</style>