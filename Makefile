run :
	ionic serve
buildDesktop :
	bash ./cmd/buildElectron.sh
buildMobile :
	bash ./cmd/buildMobile.sh $(platform)
