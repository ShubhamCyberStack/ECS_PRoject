Required Technology for this project
•	Github
•	Ec2
•	IAM
•	ECR
•	ECS
•	Cloud watch

1 . Create a EC2 instance 
•	Ubuntu image
•	Select keypair
•	Configure virtual network , assign public ip , select public subnet . 
•	Security group allow ssh and http
•	Launch the instance 

2.  Comes inside the VM and run these commands 
•	sudo apt update && upgrade -y
•	git clone https://github.com/ShubhamCyberStack/ECS_PRoject.git
•	sudo apt install docker.io
•	give permission to the sudo group 
•	sudo usermod -aG docker $USER
•	sudo reboot

3 NOW download aws client use commands inside vm
•	sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
•	sudo apt install unzip
•	unzip awscliv2.zip
•	sudo ./aws/install


4 NOW create a Public ECR  Repository
•	name   car-apk
•	select      Architectures   ARM    ARM64  x86    x86-64   
•	Operating systems   Linux
•	Create
4.1 click on the repository you have created
•	Click on view push commands button
•	Now follow and run all these commands in your Vm 
•	Now to run these command we need to  configure credentials with aws
5  go to the IAM create new user name ECS give console access and give password 
•	Create new group named as ECS 
•	Add the policies search elasticcontainer ans add all the three policies coming after that create 
•	Now go to users click on ECS user and add new accesskey 
•	Do aws configure in your vm
•	now paste AWS Access Key ID and AWS Secret Access Key which was generated while creating the access key and for left all the things just press enter and continue don’t write anything 
•	now run all those commands one by one in the vm which comes after clicking the push commands button

6 Now after running all the commands which comes after clicking pushcommands 
•	Login successed
•	Image got created 
•	Your image got tagged 
•	Your image got pushed to the ECR repository
•	Now you can see your image in the ECR repo images
 
7  Now go to the ECS and create the cluster select
•	Fragate
•	Enable monitoring with cloud watch
 and to run the cluster you need the task definition in taskdefination you need to define 
•	Image 
•	Server
•	Ram
•	Storage
•	Environment variable 
8 Create new task definition
•	Name carApktask
•	Now you need to create new ecsTaskexecutionRole
•	For creating you need to go to the IAM roles and create the new role named as ecsTaskexecutionRole
•	after creating the role select that role while creating task definition
•	name the container named as car-conatiner
•	copy and paste the Image URI form the ECR repo image 
•	now do the post mapping add port 8000    TCP  container-8000-http   HTTP
•	tick use log collection
•	and create 

9 Now your task definition got created
•	select task definition 
•	click on deploy – runtask – give task details – select cluster – create 
•	now go in the cluster scroll down and click in task and you see the task click in it copy the public ip and run on browser
•	now you can open view all the logs cloudwatch
Troubleshooting
IF not able to access , when open the task you see enc id click on it than security group and add the port 8000 in inbound rules custom tCp and allow traffer form any where 



