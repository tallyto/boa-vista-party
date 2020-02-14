const removeImageS3 = require('./../config/removeImageS3');

const Atleticas = require('../models/atleticaSchema');

class AtleticaController {
  async listarAtleticas(req, res) {
    const atleticas = await Atleticas.find().sort({ title: 1 });
    res.render('admin/atleticas', { atleticas, title: 'Atléticas' });
  }

  pageCadastrarAtletica(req, res) {
    res.render('admin/cadastrar-atletica', { title: 'Cadastrar Atlética' });
  }

  async pageEditarAtletica(req, res) {
    const { id } = req.params;
    const atletica = await Atleticas.findById({ _id: id });
    res.render('admin/editar-atletica', { atletica, title: `Editar atlética ${atletica.title}` });
  }

  async editarAtletica(req, res) {
    const {
      id, title, description, slug,
    } = req.body;

    try {
      const atletica = await Atleticas.findById({ _id: id });
      atletica.title = title;
      atletica.description = description;
      atletica.slug = slug;
      await atletica.save();
      req.flash('success_msg', 'Atética editada com sucesso!');
      res.redirect('/atleticas');
    } catch (error) {
      req.flash('error_msg', 'Houve um erro ao editar atlética!');
      res.redirect('/admin/atleticas');
    }
  }

  async deletarAtletica(req, res) {
    const { id } = req.body;
    const erros = [];

    try {
      const atletica = await Atleticas.findByIdAndDelete({ _id: id });
      removeImageS3(atletica.img.key);
      req.flash('success_msg', 'Atlética removida com sucesso!');
      res.redirect('/atleticas');
    } catch (error) {
      erros.push({ texto: 'Houve um erro ao deletar a atlética!' });
      res.render('admin/atleticas', {
        erros, title: 'Atléticas',
      });
    }
  }

  async cadastrarAtletica(req, res) {
    const { title, description, slug } = req.body;
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;

    const newAtletica = {
      title,
      description,
      slug,
      img: {
        name,
        size,
        key,
        url,
      },
    };

    const erros = [];

    try {
      await Atleticas.create(newAtletica);
      req.flash('success_msg', 'Atlética cadastrada com sucesso!');
      res.redirect('/atleticas');
    } catch (error) {
      erros.push({ texto: 'Houve um erro ao cadastrar a atlética!' });
      res.render('admin/cadastrar-atletica', {
        erros, title: 'Cadastrar atlética',
      });
    }
  }
}
module.exports = new AtleticaController();
