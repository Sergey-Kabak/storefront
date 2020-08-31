<template>
  <div class="phone-tooltip">
		<span class="phone-tooltip-title">{{ $t('Consultation by telephone') }}</span>
		<a class="phone-tooltip-number" href="tel:+380674666111">+38 073 090 87 07</a>
		<a class="phone-tooltip-number" href="tel:+380970908707">+38 097 090 87 07</a>
		<span class="phone-tooltip-date">Пн-Пт: 9:00-18:00; Сб-Вс: {{ $t('Weekend') }}</span>
		<span class="phone-tooltip-description">{{ $t('Free of charge from landlines and mobile phones in Ukraine') }}</span>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.phone-tooltip {
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
		color: #5F5E5E;
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