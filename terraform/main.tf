provider "aws" {
  region = "us-east-1"
}

# Generate an SSH Key so we can securely copy files to the server
resource "tls_private_key" "parkeasy_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "parkeasy-server-key"
  public_key = tls_private_key.parkeasy_key.public_key_openssh
}

resource "local_file" "private_key" {
  content         = tls_private_key.parkeasy_key.private_key_pem
  filename        = "${path.module}/parkeasy-key.pem"
}

# Create Firewall Rules
resource "aws_security_group" "parkeasy_sg" {
  name        = "parkeasy_web_traffic"
  description = "Allow web and API traffic for ParkEasy"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create the AWS Server
resource "aws_instance" "parkeasy_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04
  instance_type = "t2.micro"              # Free Tier
  key_name      = aws_key_pair.generated_key.key_name
  
  security_groups = [aws_security_group.parkeasy_sg.name]

  # Install Docker automatically
  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install docker.io docker-compose -y
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              EOF

  tags = {
    Name = "ParkEasy-Production-Server"
  }
}

output "server_public_ip" {
  value = aws_instance.parkeasy_server.public_ip
}
