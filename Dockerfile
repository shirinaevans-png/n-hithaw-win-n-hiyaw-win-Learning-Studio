FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends hfst && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY server.py /app/server.py
COPY model/ /app/model/
RUN useradd --system --user-group cree && chmod -R a+rX /app/model
USER cree
ENV HOST=0.0.0.0 PORT=10000 HFST_LOOKUP=hfst-lookup CRK_GENERATOR=/app/model/crk-strict-generator.hfstol
EXPOSE 10000
CMD ["python", "server.py"]
