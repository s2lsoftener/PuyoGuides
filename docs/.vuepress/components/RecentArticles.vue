<template>
<div>
	<ul>
		<li v-for="post in recentFiles">
			<a :href="post.path">{{post.title}}</a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props: ['path'],
	data() {
		return {};
	}, 
	computed:{
		recentFiles() {
			let files = this.$site.pages.filter(p => {
        
        return p.path.indexOf(this.path) >= 0;
			}).sort((a,b) => {
				let aDate = new Date(a.frontmatter.published).getTime();
				let bDate = new Date(b.frontmatter.published).getTime();
				let diff = aDate - bDate;
				if(diff < 0) return -1;
				if(diff > 0) return 1;
				return 0;
			}).slice(0,10);
			
			console.log(files)
			return files;
		}
	}
}
</script>