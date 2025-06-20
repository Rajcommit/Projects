Creating namespace
 kubectl create -f ns.yaml
 kubectl get all -n wordpress
Creating secrets for db
 kubectl create -f secret.yaml
 kubectl describe secret/db-secret -n wordpress
Creating pv,pvcfor wp and db
 kubectl create -f pvpvc.yaml
 kubectl create -f pvpvcwp.yaml
 Creating deployment and serice for db
 kubectl create -f dbdepsvc.yaml
 kubectl get svc -n wordpress
 kubectl get ep -n wordpress
 kubectl get po -n wordpress
 Creting phpadmin for db
 kubectl create -f phpdepsvc.yaml
 kubectl get svc -n wordpress

 Creating wp
 kubectl create -f wordpressdepsvc.yaml
 kubectl get all -n wordpress

 -->WP website created-->db
--> php admin will be managing db

WP-->Expose to outside world
