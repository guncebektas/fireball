FROM zodern/meteor
# ENV ROOT_URL http://localhost:3000
COPY --chown=app:app saas.tar.gz /bundle/bundle.tar.gz

EXPOSE 3000
CMD ["npm", "start"]
